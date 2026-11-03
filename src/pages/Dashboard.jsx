import React, { useEffect, useMemo, useState } from "react";
import { Resume } from "@/entities/Resume";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Eye,
  FileText,
  Gauge,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageHref, createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AnimatedBackground from "@/components/common/AnimatedBackground";

function ScoreRing({ score = 0, size = 56 }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const color = clamped >= 80 ? "#34d399" : clamped >= 50 ? "#fbbf24" : "#f87171";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="5"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clamped / 100) }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <span
        className="absolute inset-0 grid place-items-center text-xs font-semibold tabular-nums"
        style={{ color }}
      >
        {clamped}
      </span>
    </div>
  );
}

function StatCard({ label, value, hint, icon: Icon, tint, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass glass-hover rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold leading-none tabular-nums text-white">
            {value}
          </p>
          <p className="mt-2 text-xs text-white/45">{hint}</p>
        </div>
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl border bg-gradient-to-br ${tint}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    setIsLoading(true);
    try {
      const data = await Resume.list("-updated_date");
      setResumes(data || []);
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
    setIsLoading(false);
  };

  const createNewResume = async () => {
    try {
      const newResume = await Resume.create({
        title: `Resume ${resumes.length + 1}`,
        template: "modern",
        personal_info: {
          full_name: "",
          email: "",
          phone: "",
          location: "",
          summary: ""
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        ats_score: 0
      });
      window.location.href = createPageHref(`Editor?id=${newResume.id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const stats = useMemo(() => {
    const count = resumes.length;
    const totalScore = resumes.reduce((sum, r) => sum + (r.ats_score || 0), 0);
    const avg = count ? Math.round(totalScore / count) : 0;
    const best = count ? Math.max(...resumes.map(r => r.ats_score || 0)) : 0;
    const experienceEntries = resumes.reduce(
      (sum, r) => sum + (r.experience?.length || 0),
      0
    );
    const withSummary = resumes.filter(r => r.personal_info?.summary).length;
    const withSkills = resumes.filter(r => (r.skills?.length || 0) > 0).length;
    const withExperience = resumes.filter(r => (r.experience?.length || 0) > 0).length;

    return {
      count,
      avg,
      best,
      experienceEntries,
      readiness: [
        {
          label: "Kurzprofil geschrieben",
          value: count ? Math.round((withSummary / count) * 100) : 0,
        },
        {
          label: "Kenntnisse hinzugefügt",
          value: count ? Math.round((withSkills / count) * 100) : 0,
        },
        {
          label: "Erfahrung eingetragen",
          value: count ? Math.round((withExperience / count) * 100) : 0,
        },
        { label: "Average ATS score", value: avg },
      ],
    };
  }, [resumes]);

  const chartData = useMemo(
    () =>
      resumes
        .slice(0, 8)
        .map(resume => ({
          name: resume.title || "Untitled",
          score: resume.ats_score || 0,
        }))
        .reverse(),
    [resumes]
  );

  const hasSkillsData = stats.count > 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b09] text-white">
      <AnimatedBackground withGrid={false} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
              Arbeitsbereich
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Deine Lebensläufe
            </h1>
            <p className="mt-2 text-sm text-white/55">
              Erstelle und verwalte deine Lebensläufe.
            </p>
          </div>
          <Button
            onClick={createNewResume}
            size="lg"
            className="rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-6 text-sm font-semibold text-[#04120c] shadow-lg shadow-emerald-500/20 transition hover:from-emerald-300 hover:to-teal-400"
          >
            <Plus className="mr-2 h-5 w-5" />
            Neuer Lebenslauf
          </Button>
        </motion.div>

        {/* KPI tiles */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total resumes"
            value={stats.count}
            hint="Über alle Vorlagen"
            icon={FileText}
            tint="from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-400/25"
            delay={0.05}
          />
          <StatCard
            label="Avg ATS score"
            value={`${stats.avg}%`}
            hint="Über deine gespeicherten Lebensläufe"
            icon={Target}
            tint="from-sky-500/20 to-cyan-500/10 text-sky-300 border-sky-400/25"
            delay={0.1}
          />
          <StatCard
            label="Best score"
            value={`${stats.best}%`}
            hint="Höchster erreichter ATS-Wert"
            icon={TrendingUp}
            tint="from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-400/25"
            delay={0.15}
          />
          <StatCard
            label="Experience entries"
            value={stats.experienceEntries}
            hint="Positionen in allen Lebensläufen"
            icon={Sparkles}
            tint="from-fuchsia-500/20 to-purple-500/10 text-fuchsia-300 border-fuchsia-400/25"
            delay={0.2}
          />
        </div>

        {/* Analytics */}
        <div className="mt-5 grid gap-5 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-5 lg:col-span-3"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  ATS-Wert je Lebenslauf
                </h2>
                <p className="text-xs text-white/45">
                  Latest {chartData.length || 0} resume
                  {chartData.length === 1 ? "" : "s"} by update date
                </p>
              </div>
              <Gauge className="h-4 w-4 text-white/35" />
            </div>

            {chartData.length ? (
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.07)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      tickFormatter={value =>
                        value.length > 12 ? `${value.slice(0, 11)}…` : value
                      }
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      contentStyle={{
                        background: "#0d1512",
                        border: "1px solid rgba(148,163,184,0.2)",
                        borderRadius: 12,
                        color: "#f4fbf7",
                        fontSize: 12,
                      }}
                      formatter={value => [`${value}%`, "ATS score"]}
                    />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={48}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            entry.score >= 80
                              ? "#34d399"
                              : entry.score >= 50
                                ? "#fbbf24"
                                : "#f87171"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="grid h-[220px] place-items-center rounded-xl border border-dashed border-white/10 text-center">
                <div>
                  <Gauge className="mx-auto h-6 w-6 text-white/25" />
                  <p className="mt-2 text-sm text-white/45">
                    Erstelle deinen ersten Lebenslauf für Auswertungen.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass rounded-2xl p-5 lg:col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Profil-Vollständigkeit
                </h2>
                <p className="text-xs text-white/45">
                  How complete your saved resumes are
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white/35" />
            </div>

            <div className="space-y-4">
              {stats.readiness.map(item => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-white/55">{item.label}</span>
                    <span className="font-medium tabular-nums text-white/80">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, item.value)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {!hasSkillsData && (
              <p className="mt-5 text-xs leading-relaxed text-white/40">
                Aktualisiert sich beim Speichern automatisch.
              </p>
            )}
          </motion.div>
        </div>

        {/* Resume grid */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Alle Lebensläufe</h2>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/50">
              {stats.count} total
            </span>
          </div>

          {isLoading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass animate-pulse rounded-2xl p-5">
                  <div className="mb-4 h-4 w-2/3 rounded bg-white/10" />
                  <div className="mb-2 h-3 w-1/3 rounded bg-white/10" />
                  <div className="h-28 rounded-xl bg-white/[0.05]" />
                </div>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl px-6 py-16 text-center"
            >
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10">
                <FileText className="h-7 w-7 text-emerald-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Noch keine Lebensläufe</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
                Get started by creating your first AI-powered resume. It only
                takes a few minutes!
              </p>
              <Button
                onClick={createNewResume}
                size="lg"
                className="mt-6 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-6 py-6 text-sm font-semibold text-[#04120c]"
              >
                <Plus className="mr-2 h-5 w-5" />
                Ersten Lebenslauf erstellen
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {resumes.map((resume, index) => (
                <motion.article
                  key={resume.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.06, 0.4) }}
                  className="glass glass-hover group flex h-full flex-col rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-white">
                        {resume.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                        {resume.template || "modern"} template
                      </p>
                    </div>
                    <ScoreRing score={resume.ats_score || 0} />
                  </div>

                  <div className="mt-4 flex-1 rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-transparent p-4">
                    <div className="space-y-2">
                      <div className="h-2 w-2/3 rounded-full bg-white/20" />
                      <div className="h-2 w-1/3 rounded-full bg-emerald-400/30" />
                      <div className="my-3 h-px w-full bg-white/10" />
                      <div className="h-2 w-full rounded-full bg-white/10" />
                      <div className="h-2 w-5/6 rounded-full bg-white/10" />
                      <div className="h-2 w-3/4 rounded-full bg-white/10" />
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] uppercase tracking-wide text-white/35">
                    Updated{" "}
                    {resume.updated_date
                      ? format(new Date(resume.updated_date), "MMM d, yyyy")
                      : "—"}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <Link
                      to={createPageUrl(`Editor?id=${resume.id}`)}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full rounded-lg border-white/12 bg-white/[0.03] text-white/80 transition group-hover:border-emerald-400/40 group-hover:text-white"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Bearbeiten
                      </Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
