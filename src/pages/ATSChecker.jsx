import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, FileSearch, Sparkles, AlertTriangle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const STOPWORDS = new Set([
  "the","and","for","with","you","your","our","are","will","that","this","have","from","they","their","been","was","were","has","had","not","but","can","all","any","who","whom","how","why","when","where","what","which","about","into","over","under","also","more","most","such","than","then","them","there","these","those","other","some","only","very","much","many","each","per","via","using","use","used","must","should","would","could","may","might","shall","its","it's","onto","upon","within","while","during","before","after","between","because","across","both","few","own","same","sο","just","does","doing","done","being","am","is","it","as","at","by","on","or","if","we","he","she","his","her","an","to","of","in","be","a","us","job","role","work","working","team","teams","candidate","candidates","applicant","company","experience","years","year","strong","good","great","ability","able","well","like","plus","etc","new","help","including","include","includes","preferred","required","require","requires","responsibilities","qualifications","looking","seeking","join","want","need","needs","make","made","making","take","taking","give","giving","day","daily","week","weekly","month","monthly","time","full","part","apply","application","description","position","opportunity","environment","level","mid","senior","junior","entry","excellent","exceptional","outstanding","proven","track","record","ideally","ideally","successfully","success","ideal","person","someone","people","world","class","best","high","highly","low","end","ends","one","two","three","four","five","six","seven","eight","nine","ten"
]);

const SKILL_PHRASES = [
  "project management","product management","stakeholder management","time management","conflict resolution","problem solving","critical thinking","decision making","data analysis","data visualization","machine learning","deep learning","natural language processing","computer vision","quality assurance","continuous integration","continuous delivery","unit testing","test automation","code review","version control","agile methodology","scrum","kanban","waterfall","product roadmap","a/b testing","user research","customer support","customer service","business development","market research","search engine optimization","social media","content creation","public speaking","technical writing","budget management","risk management","change management","supply chain","vendor management","client relations","team leadership","mentoring","coaching","hiring","recruiting","performance management","account management","project planning","process improvement","business analysis","requirements gathering","api design","database design","distributed systems","microservices","event-driven","test-driven development","object-oriented","functional programming","restful apis","graphql","sql queries","data modeling","etl pipelines","data warehousing","business intelligence","dashboard reporting","kpi tracking","crm","erp","saas","b2b","b2c","ci/cd","devops","cloud computing","infrastructure as code","containerization","load balancing","monitoring","observability","incident response","disaster recovery","information security","penetration testing","vulnerability assessment","access control","identity management","encryption","firewalls","network security","gdpr","compliance","iso 27001","risk assessment","business continuity","git","github","gitlab","docker","kubernetes","terraform","ansible","jenkins","aws","azure","google cloud","linux","bash","python","javascript","typescript","react","angular","vue","node.js","express","django","flask","spring boot","java","c#","c++","go","rust","php","ruby","rails",".net","sql","mysql","postgresql","mongodb","redis","elasticsearch","kafka","rabbitmq","html","css","tailwind","bootstrap","figma","sketch","adobe photoshop","excel","powerpoint","microsoft office","google analytics","tableau","power bi","salesforce","jira","confluence","slack","zoom","trello","asana","notion","sap"
];

const ACTION_VERBS = [
  "achieved","led","built","created","designed","developed","launched","managed","improved","increased","reduced","delivered","implemented","optimized","automated","negotiated","coordinated","established","spearheaded","streamlined","transformed","drove","generated","produced","executed","resolved","analyzed","migrated","architected","mentored","trained","presented","published","patented","awarded","won","secured","saved","grew","scaled"
];

const tokenize = (text) =>
  (text.toLowerCase().match(/[a-z][a-z0-9+#./-]{1,}/g) || [])
    .map((t) => t.replace(/[.\-/]+$/, ""))
    .filter((t) => t.length > 2 && !/^\d+$/.test(t));

const extractJobKeywords = (jobText) => {
  const lower = " " + jobText.toLowerCase().replace(/[^a-z0-9+#./\- ]/g, " ").replace(/\s+/g, " ") + " ";
  const foundPhrases = new Map();
  for (const phrase of SKILL_PHRASES) {
    if (lower.includes(" " + phrase + " ") || lower.includes(" " + phrase + ",")) {
      foundPhrases.set(phrase, (foundPhrases.get(phrase) || 0) + 3);
    }
  }
  const freq = new Map();
  for (const tok of tokenize(jobText)) {
    if (STOPWORDS.has(tok)) continue;
    freq.set(tok, (freq.get(tok) || 0) + 1);
  }
  const single = [...freq.entries()].filter(([w]) => !foundPhrases.has(w));
  const merged = new Map([...foundPhrases.entries(), ...single]);
  return [...merged.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 30)
    .map(([word]) => word);
};

const analyze = (resumeText, jobText) => {
  const resumeLower = resumeText.toLowerCase();
  const keywords = extractJobKeywords(jobText);
  const matched = keywords.filter((k) => resumeLower.includes(k));
  const missing = keywords.filter((k) => !resumeLower.includes(k));
  const score = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0;

  const words = (resumeText.match(/\S+/g) || []).length;
  const hasQuantified = /\d+\s*%|\d+\+|\$\d|€\d|\b\d{2,}\b/.test(resumeText);
  const usedActionVerbs = ACTION_VERBS.filter((v) => resumeLower.includes(v));
  const sections = ["experience", "education", "skills", "project"].filter((s) => resumeLower.includes(s));
  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.]+/.test(resumeText);
  const hasPhone = /(\+\d[\d\s-]{7,}|\b\d{3}[\s-]?\d{3,}[\s-]?\d{3,}\b)/.test(resumeText);

  const tips = [];
  if (score < 60) tips.push("Match more of the job description's key terms naturally in your bullet points — ATS filters often rank on keyword overlap.");
  if (!hasQuantified) tips.push("Add measurable results (%, €, counts, time saved). Quantified achievements stand out to both ATS and recruiters.");
  if (usedActionVerbs.length < 5) tips.push("Start bullet points with strong action verbs (led, built, improved, reduced) instead of passive phrasing.");
  if (words > 800) tips.push("Your resume is long (" + words + " words). Aim for 450–650 words (1–2 pages) so key terms stay dense.");
  if (words < 150) tips.push("Your resume looks thin (" + words + " words). Expand your experience bullets with concrete outcomes.");
  if (sections.length < 3) tips.push("Use standard section headings (Experience, Education, Skills) — non-standard names confuse parsers.");
  if (!hasEmail || !hasPhone) tips.push("Include email and phone near the top in plain text (not inside a header image or table).");
  if (!tips.length) tips.push("Strong fundamentals. Tailor the missing keywords where they're truthful, and keep it to two pages.");

  return { keywords, matched, missing, score, words, usedActionVerbs, hasQuantified, sections, tips };
};

export default function ATSChecker() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);

  const run = () => {
    if (resume.trim().length < 50 || job.trim().length < 30) return;
    setResult(analyze(resume, job));
  };
  const reset = () => { setResume(""); setJob(""); setResult(null); };

  const scoreColor = useMemo(() => {
    if (!result) return "";
    if (result.score >= 70) return "text-green-600";
    if (result.score >= 45) return "text-yellow-500";
    return "text-red-500";
  }, [result]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
          <FileSearch className="w-8 h-8 text-green-600" /> ATS Resume Checker
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Paste your resume and a job description. See which keywords you match, what's missing, and get practical tips — all processed locally in your browser.
        </p>
      </div>

      {!result ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your resume text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste the full text of your resume here…"
                className="min-h-[280px] font-mono text-sm"
              />
              <p className="text-xs text-gray-400 mt-2">{resume.trim() ? (resume.match(/\S+/g) || []).length : 0} words</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="Paste the job posting you're targeting…"
                className="min-h-[280px] font-mono text-sm"
              />
              <p className="text-xs text-gray-400 mt-2">{job.trim() ? (job.match(/\S+/g) || []).length : 0} words</p>
            </CardContent>
          </Card>
          <div className="md:col-span-2 flex justify-center gap-3">
            <Button onClick={run} disabled={resume.trim().length < 50 || job.trim().length < 30} className="bg-green-600 hover:bg-green-700 px-8 h-11">
              <Sparkles className="w-4 h-4 mr-2" /> Analyze match
            </Button>
            <Button variant="outline" onClick={reset}>Clear</Button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center shrink-0">
                  <div className={`text-6xl font-bold ${scoreColor}`}>{result.score}</div>
                  <div className="text-sm text-gray-500 mt-1">match score</div>
                </div>
                <div className="flex-1 w-full">
                  <Progress value={result.score} className="h-3 mb-4" />
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div><div className="font-bold text-gray-900">{result.keywords.length}</div><div className="text-gray-500 text-xs">keywords found</div></div>
                    <div><div className="font-bold text-green-600">{result.matched.length}</div><div className="text-gray-500 text-xs">matched</div></div>
                    <div><div className="font-bold text-red-500">{result.missing.length}</div><div className="text-gray-500 text-xs">missing</div></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600" /> Matched keywords</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.matched.map((k) => <Badge key={k} className="bg-green-100 text-green-800 hover:bg-green-100">{k}</Badge>)}
                {!result.matched.length && <p className="text-sm text-gray-500">No keyword matches found yet.</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><XCircle className="w-5 h-5 text-red-500" /> Missing keywords</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.missing.map((k) => <Badge key={k} variant="destructive">{k}</Badge>)}
                {!result.missing.length && <p className="text-sm text-green-600">Nothing missing — full keyword coverage!</p>}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-yellow-500" /> Tips to improve</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.tips.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700"><span className="text-green-600 font-bold">→</span> {t}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">{result.words} words</span>
                <span className="px-2 py-1 bg-gray-100 rounded">{result.hasQuantified ? "quantified results ✓" : "no numbers found"}</span>
                <span className="px-2 py-1 bg-gray-100 rounded">{result.usedActionVerbs.length} action verbs</span>
                <span className="px-2 py-1 bg-gray-100 rounded">sections: {result.sections.join(", ") || "none detected"}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" /> Check another resume</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
