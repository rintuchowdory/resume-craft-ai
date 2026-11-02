// Local, account-free backend.
//
// Everything the builder stores (resumes, applications, profile) lives in this
// browser's localStorage. No Base44 sign-in, no server session, no token - the
// app works the moment the page loads, including on a static host.

const DB_KEY = "resumeai_db_v2";
const PROFILE_KEY = "resumeai_profile_v1";
export const LOCAL_USER_ID = "local-user";

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const nowIso = () => new Date().toISOString();

const readDb = () => {
  try {
    const raw = localStorage.getItem(DB_KEY);
    const db = raw ? JSON.parse(raw) : null;
    return db && typeof db === "object" ? db : {};
  } catch {
    return {};
  }
};

const writeDb = (db) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (error) {
    console.error("Local storage write failed", error);
  }
};

const collection = (db, name) => (Array.isArray(db[name]) ? db[name] : []);

/* ---------------------------------------------------------------- queries */

const getPath = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);

const matchValue = (actual, expected) => {
  if (expected && typeof expected === "object" && !Array.isArray(expected)) {
    const keys = Object.keys(expected);
    const isOperator = keys.length > 0 && keys.every((k) => k.startsWith("$"));
    if (isOperator) {
      return keys.every((op) => {
        const want = expected[op];
        switch (op) {
          case "$eq":
            return actual === want;
          case "$ne":
            return actual !== want;
          case "$gt":
            return actual > want;
          case "$gte":
            return actual >= want;
          case "$lt":
            return actual < want;
          case "$lte":
            return actual <= want;
          case "$in":
            return Array.isArray(want) && want.includes(actual);
          case "$nin":
            return Array.isArray(want) && !want.includes(actual);
          case "$exists":
            return want ? actual !== undefined : actual === undefined;
          case "$regex":
            try {
              return new RegExp(want, "i").test(String(actual ?? ""));
            } catch {
              return false;
            }
          default:
            return true;
        }
      });
    }
    return Object.keys(expected).every((key) => matchValue(actual?.[key], expected[key]));
  }
  if (Array.isArray(actual) && !Array.isArray(expected)) return actual.includes(expected);
  return actual === expected;
};

const matches = (record, query) => {
  if (!query || typeof query !== "object") return true;
  return Object.entries(query).every(([key, expected]) => {
    if (key === "$or") {
      return Array.isArray(expected) && expected.some((sub) => matches(record, sub));
    }
    if (key === "$and") {
      return Array.isArray(expected) && expected.every((sub) => matches(record, sub));
    }
    return matchValue(getPath(record, key), expected);
  });
};

const sortRecords = (records, sort) => {
  if (!sort) return records;
  const desc = sort.startsWith("-");
  const field = desc ? sort.slice(1) : sort;
  return [...records].sort((a, b) => {
    const av = getPath(a, field);
    const bv = getPath(b, field);
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (av === bv) return 0;
    return (av > bv ? 1 : -1) * (desc ? -1 : 1);
  });
};

// The Base44 SDK accepts both list('-created_date', 20, 0) and
// list({ limit: 20 }) - support both shapes.
const normalizeArgs = (first, second, third) => {
  if (first && typeof first === "object" && !Array.isArray(first)) {
    return {
      query: null,
      sort: first.sort || null,
      limit: first.limit,
      skip: first.skip || 0,
    };
  }
  return {
    query: null,
    sort: typeof first === "string" ? first : null,
    limit: typeof second === "number" ? second : undefined,
    skip: typeof third === "number" ? third : 0,
  };
};

const page = (records, limit, skip = 0) => {
  const start = skip || 0;
  const end = limit ? start + limit : undefined;
  return records.slice(start, end);
};

/* ------------------------------------------------------------------ entity */

const makeEntity = (name) => {
  const all = () => collection(readDb(), name);

  const list = async (a, b, c) => {
    const { sort, limit, skip } = normalizeArgs(a, b, c);
    return page(sortRecords(all(), sort), limit, skip);
  };

  const filter = async (query, a, b) => {
    const { sort, limit, skip } = normalizeArgs(a, b);
    return page(sortRecords(all().filter((r) => matches(r, query)), sort), limit, skip);
  };

  const get = async (id) => all().find((r) => r.id === id) || null;

  const create = async (data) => {
    const db = readDb();
    const record = {
      ...data,
      id: uid(),
      created_date: nowIso(),
      updated_date: nowIso(),
      created_by: LOCAL_USER_ID,
    };
    db[name] = [...collection(db, name), record];
    writeDb(db);
    return record;
  };

  const bulkCreate = async (rows = []) => Promise.all(rows.map((row) => create(row)));

  const update = async (id, data) => {
    const db = readDb();
    let updated = null;
    db[name] = collection(db, name).map((record) => {
      if (record.id !== id) return record;
      updated = { ...record, ...data, id, updated_date: nowIso() };
      return updated;
    });
    if (!updated) throw new Error(`${name} ${id} not found`);
    writeDb(db);
    return updated;
  };

  const remove = async (id) => {
    const db = readDb();
    db[name] = collection(db, name).filter((record) => record.id !== id);
    writeDb(db);
    return { id };
  };

  return { list, filter, get, create, bulkCreate, update, delete: remove };
};

/* -------------------------------------------------------------------- seed */

const SEED_JOBS = [
  {
    title: "Produktionsmitarbeiter Montage",
    company: "INGENERIC GmbH",
    location: "Aachen",
    type: "full-time",
    experience_level: "entry",
    remote_friendly: false,
    salary_min: 32000,
    salary_max: 38000,
    description:
      "Montage und Qualitätskontrolle von Präzisionsoptiken im Reinraum. Sorgfältige Dokumentation der Prüfschritte.",
    requirements: ["Erfahrung in Montage oder Fertigung", "Sorgfalt und Teamfähigkeit", "Bereitschaft zur Schichtarbeit"],
    skills: ["Montage", "Reinraum", "Qualitätskontrolle"],
    benefits: ["Feste Anstellung", "Schichtzulagen"],
    is_trending: true,
    posted_date: nowIso(),
  },
  {
    title: "Qualitätsprüfer (m/w/d) Medizintechnik",
    company: "Abiomed Europe",
    location: "Aachen",
    type: "full-time",
    experience_level: "mid",
    remote_friendly: false,
    salary_min: 38000,
    salary_max: 44000,
    description:
      "Prüfung medizinischer Baugruppen unter dem Mikroskop, Freigabe nach Prüfplan, Mitarbeit bei Abweichungsanalysen.",
    requirements: ["Erfahrung in der Qualitätsprüfung", "Mikroskoparbeit", "Sicherer Umgang mit Prüfplänen"],
    skills: ["Qualitätskontrolle", "Mikroskopie", "Dokumentation"],
    benefits: ["Weiterbildung", "Betriebliche Altersvorsorge"],
    is_trending: true,
    posted_date: nowIso(),
  },
  {
    title: "Elektronikfertiger Baugruppen",
    company: "Nobis Printen",
    location: "Baesweiler",
    type: "full-time",
    experience_level: "entry",
    remote_friendly: false,
    salary_min: 30000,
    salary_max: 34000,
    description: "Bestückung und Endprüfung elektronischer Baugruppen nach Fertigungsunterlagen.",
    requirements: ["Technisches Verständnis", "Feinmotorik", "Zuverlässigkeit"],
    skills: ["Elektronik", "Löten", "Endkontrolle"],
    benefits: ["Kurzer Arbeitsweg", "Teamarbeit"],
    posted_date: nowIso(),
  },
  {
    title: "Maschinenbediener Kunststofftechnik",
    company: "Kunststoffwerk Rheinland",
    location: "Düren",
    type: "full-time",
    experience_level: "entry",
    remote_friendly: false,
    salary_min: 31000,
    salary_max: 36000,
    description: "Bedienung und Rüstung von Spritzgussmaschinen, Stichprobenprüfung der Teile.",
    requirements: ["Schichtbereitschaft", "Technisches Geschick", "Qualitätsbewusstsein"],
    skills: ["Spritzguss", "Maschinenbedienung", "Prüfung"],
    benefits: ["Schichtzulagen"],
    posted_date: nowIso(),
  },
  {
    title: "Lagerlogistiker mit Staplerschein",
    company: "Logistik Aachen-West",
    location: "Aachen",
    type: "full-time",
    experience_level: "entry",
    remote_friendly: false,
    salary_min: 28000,
    salary_max: 33000,
    description: "Kommissionierung, Warenannahme und Bestandsführung im Lager.",
    requirements: ["Staplerschein von Vorteil", "Körperliche Belastbarkeit", "Teamarbeit"],
    skills: ["Logistik", "Kommissionierung", "Stapler"],
    benefits: ["Feste Anstellung"],
    posted_date: nowIso(),
  },
  {
    title: "Technischer Prüfer Optik (Teilzeit)",
    company: "Optik Jülich",
    location: "Jülich",
    type: "part-time",
    experience_level: "mid",
    remote_friendly: false,
    salary_min: 18000,
    salary_max: 24000,
    description: "Prüfung optischer Komponenten mit Messmitteln, Protokollierung der Messwerte.",
    requirements: ["Erfahrung mit Messmitteln", "Genauigkeit", "Selbstständige Arbeitsweise"],
    skills: ["Messtechnik", "Optik", "Protokollierung"],
    benefits: ["Teilzeit", "Flexible Zeiten"],
    posted_date: nowIso(),
  },
];

const seedIfEmpty = () => {
  const db = readDb();
  if (collection(db, "Job").length > 0) return;
  db.Job = SEED_JOBS.map((job) => ({
    ...job,
    id: uid(),
    created_date: nowIso(),
    updated_date: nowIso(),
    created_by: LOCAL_USER_ID,
  }));
  writeDb(db);
};

seedIfEmpty();

/* --------------------------------------------------------------- local user */

const readProfile = () => {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}") || {};
  } catch {
    return {};
  }
};

const localUser = () => ({
  id: LOCAL_USER_ID,
  email: "",
  full_name: "Local Profile",
  role: "user",
  avatar: "",
  ...readProfile(),
});

const updateProfile = (data = {}) => {
  const merged = { ...readProfile(), ...data };
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
  } catch (error) {
    console.error("Profile write failed", error);
  }
  return localUser();
};

/* -------------------------------------------------------------------- client */

const noSession = () => {
  // Sign-in is intentionally a no-op: this build has no accounts.
  console.info("This build runs entirely in your browser. No sign-in needed.");
  return Promise.resolve(localUser());
};

const Core = {
  InvokeLLM: async () => {
    throw new Error("AI helper is not wired in this offline build");
  },
  SendEmail: async () => ({ ok: false, error: "Email needs an account. Copy the text instead." }),
  SendSMS: async () => ({ ok: false, error: "SMS needs an account. Copy the text instead." }),
  UploadFile: async ({ file } = {}) => {
    if (!file) throw new Error("No file provided");
    const file_url = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read file"));
      reader.readAsDataURL(file);
    });
    return { file_url };
  },
  GenerateImage: async () => ({ url: "" }),
  ExtractDataFromUploadedFile: async () => ({ status: "error", details: "Not available offline" }),
};

export const localClient = {
  auth: {
    me: async () => localUser(),
    updateMe: async (data) => updateProfile(data),
    logout: async () => localUser(),
    redirectToLogin: () => {},
    loginWithProvider: noSession,
    loginWithRedirect: noSession,
    isAuthenticated: async () => true,
  },
  entities: {
    Resume: makeEntity("Resume"),
    Job: makeEntity("Job"),
    JobApplication: makeEntity("JobApplication"),
    StudentEvent: makeEntity("StudentEvent"),
  },
  integrations: { Core },
  appLogs: { logUserInApp: async () => ({ ok: true }) },
  functions: {
    invoke: async () => {
      throw new Error("Server functions are not available in this offline build");
    },
  },
};

export default localClient;
