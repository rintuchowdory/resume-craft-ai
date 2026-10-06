import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Copy, Download, RefreshCw, PenLine } from "lucide-react";
import { motion } from "framer-motion";

const TONES = {
  professional: "professional and confident",
  enthusiastic: "warm and genuinely enthusiastic",
  concise: "brief, direct and no-nonsense",
};

const OPENERS = {
  professional: "I am writing to apply for the {role} position at {company}. With a background in {field}, I believe my skills and experience align well with what your team is looking for.",
  enthusiastic: "When I saw the opening for {role} at {company}, I could hardly contain my excitement. {company} does work I genuinely admire, and I would love to contribute.",
  concise: "I would like to apply for the {role} position at {company}. In short: I have hands-on experience with {skills}, and I get results.",
};

const CLOSERS = {
  professional: "Thank you for considering my application. I would welcome the opportunity to discuss how my experience can contribute to your team.",
  enthusiastic: "Thank you so much for your time and consideration — I would be thrilled to talk with you about the role.",
  concise: "Thank you for your time. I am available for an interview at your convenience.",
};

const buildLetter = (d, tone) => {
  const skillsList = d.skills.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
  const skillsStr = skillsList.length > 1
    ? skillsList.slice(0, -1).join(", ") + " and " + skillsList.slice(-1)
    : skillsList[0] || "the required skills";

  const achievementSentence = d.achievement
    ? ` Most recently, ${d.achievement.replace(/\.$/, "")}.`
    : "";

  const companySentence = d.companyMotive
    ? ` What draws me to ${d.company || "your company"}: ${d.companyMotive.replace(/\.$/, "")}.`
    : "";

  const opener = OPENERS[tone]
    .replace("{role}", d.role || "open")
    .replace("{company}", d.company || "your company")
    .replace("{field}", d.field || "this field")
    .replace("{skills}", skillsStr);

  const body =
    `In my work so far, I have built solid experience with ${skillsStr}.` +
    achievementSentence +
    (d.field ? ` My background in ${d.field} has taught me to learn quickly, communicate clearly, and take ownership of outcomes.` : "") +
    companySentence;

  const closer = CLOSERS[tone];

  return `Dear Hiring Manager,\n\n${opener}\n\n${body}\n\n${closer}\n\nBest regards,\n${d.name || "Your Name"}${d.email ? `\n${d.email}` : ""}${d.phone ? `\n${d.phone}` : ""}`;
};

export default function CoverLetter() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", company: "", field: "", skills: "", achievement: "", companyMotive: "" });
  const [tone, setTone] = useState("professional");
  const [letter, setLetter] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const generate = () => setLetter(buildLetter(form, tone));

  const canGenerate = form.role.trim().length > 1 && form.skills.trim().length > 2;

  const wordCount = useMemo(() => (letter.match(/\S+/g) || []).length, [letter]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const download = () => {
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${(form.company || "general").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
          <PenLine className="w-8 h-8 text-green-600" /> Cover Letter Generator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fill in the essentials, pick a tone, and get a ready-to-send cover letter. Everything is generated locally — no sign-in needed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Your name" value={form.name} onChange={set("name")} />
              <Input placeholder="Role you're applying for *" value={form.role} onChange={set("role")} />
            </div>
            <Input placeholder="Company" value={form.company} onChange={set("company")} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Email" value={form.email} onChange={set("email")} />
              <Input placeholder="Phone" value={form.phone} onChange={set("phone")} />
            </div>
            <Input placeholder="Your field / background (e.g. IT security)" value={form.field} onChange={set("field")} />
            <Textarea placeholder="Key skills, comma separated * (e.g. Python, SQL, incident response)" value={form.skills} onChange={set("skills")} className="min-h-[70px]" />
            <Textarea placeholder="A concrete achievement (e.g. reduced server costs by 30%)" value={form.achievement} onChange={set("achievement")} className="min-h-[70px]" />
            <Textarea placeholder="Why this company? (optional, one sentence)" value={form.companyMotive} onChange={set("companyMotive")} className="min-h-[70px]" />
            <div>
              <label className="text-sm text-gray-500 block mb-1.5">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generate} disabled={!canGenerate} className="w-full bg-green-600 hover:bg-green-700 h-11">
              <Mail className="w-4 h-4 mr-2" /> Generate cover letter
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Your letter</CardTitle>
            {letter && <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={copy}>
                <Copy className="w-3.5 h-3.5 mr-1" /> {copied ? "Copied!" : "Copy"}
              </Button>
              <Button size="sm" variant="outline" onClick={download}>
                <Download className="w-3.5 h-3.5 mr-1" /> .txt
              </Button>
            </div>}
          </CardHeader>
          <CardContent>
            {letter ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed border rounded-lg p-5 bg-gray-50 min-h-[380px]">{letter}</pre>
                <p className="text-xs text-gray-400 mt-2">{wordCount} words — ready to paste into your email or application form.</p>
                <Button size="sm" variant="ghost" className="mt-3 text-gray-500" onClick={generate}>
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Regenerate with current details
                </Button>
              </motion.div>
            ) : (
              <div className="h-[380px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
                <Mail className="w-10 h-10 mb-3 opacity-40" />
                <p className="text-sm">Fill in the form and hit generate —</p>
                <p className="text-sm">your letter appears here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
