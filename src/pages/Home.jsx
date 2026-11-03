import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Globe,
  LayoutTemplate,
  PartyPopper,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Wand2,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/common/AnimatedBackground";

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingResume2D() {
  return (
    <motion.div
      className="glass relative w-[272px] overflow-hidden rounded-2xl p-6 sm:w-[300px] lg:w-[320px] lg:p-7"
      animate={{ y: [-8, 8] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="absolute -bottom-20 -left-14 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-sm font-bold text-[#04120c]">
            RC
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-24 rounded-full bg-white/25" />
            <div className="h-2 w-16 rounded-full bg-emerald-400/40" />
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
            ATS 98
          </span>
        </div>

        <div className="h-4 w-3/4 rounded bg-white/20" />
        <div className="mt-2 h-2.5 w-1/2 rounded-full bg-emerald-400/30" />

        <div className="my-4 h-px w-full bg-white/10" />

        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-11/12 rounded-full bg-white/10" />
          <div className="h-2 w-4/5 rounded-full bg-white/10" />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          Kenntnisse
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["React", "Python", "SQL", "Figma"].map(skill => (
            <span
              key={skill}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 space-y-2.5">
          {[88, 72, 94].map((width, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 1.4, delay: 0.4 + index * 0.15 }}
                />
              </div>
              <span className="w-6 text-right text-[10px] tabular-nums text-white/40">
                {width}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const BENEFITS = [
  {
    icon: Sparkles,
    title: "KI-generierte Inhalte",
    desc: "Passende Stichpunkte und Kurzprofile für deine Branche",
    tint: "from-purple-500/20 to-fuchsia-500/10 text-purple-300 border-purple-400/25",
  },
  {
    icon: Target,
    title: "ATS-optimiert",
    desc: "Bestehe 99 % der Bewerbermanagementsysteme mit unserer Optimierung",
    tint: "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-400/25",
  },
  {
    icon: Download,
    title: "Mehrere Formate",
    desc: "Export als PDF, DOCX und teilbarer Link — sofort",
    tint: "from-sky-500/20 to-cyan-500/10 text-sky-300 border-sky-400/25",
  },
  {
    icon: TrendingUp,
    title: "Echtzeit-Statistik",
    desc: "Verfolge Ergebnisse und erhalte Verbesserungsvorschläge",
    tint: "from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-400/25",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Vorlage wählen",
    desc: "Wähle aus ATS-optimierten Profi-Vorlagen",
    icon: LayoutTemplate,
  },
  {
    step: "02",
    title: "KI-Unterstützung",
    desc: "Unsere KI erstellt passende Inhalte aus deinen Angaben",
    icon: Wand2,
  },
  {
    step: "03",
    title: "Live-Vorschau",
    desc: "Sieh deinen Lebenslauf beim Bearbeiten live",
    icon: Eye,
  },
  {
    step: "04",
    title: "Export & bewerben",
    desc: "Herunterladen und sofort bewerben",
    icon: Rocket,
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Softwareentwicklerin",
    company: "Google",
    testimonial:
      "ResumeAI hat mir den Job bei Google gebracht! Die KI-Vorschläge passten genau, und die ATS-Optimierung wirkt.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Michael Rodriguez",
    role: "Produktmanager",
    company: "Meta",
    testimonial:
      "In 3 Wochen von der Arbeitslosigkeit zum Produktmanager bei Meta. Vorlagen und Job-Abgleich sind entscheidend!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Priya Sharma",
    role: "Data Scientist",
    company: "Microsoft",
    testimonial:
      "Die KI-Inhalte haben mir Stunden gespart und meine Erfahrung perfekt formuliert. Klare Empfehlung!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

export default function Home() {
  const [showEventBanner, setShowEventBanner] = React.useState(true);

  return (
    <div className="relative min-h-screen bg-[#070b09] text-white">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:pt-14">
          {showEventBanner && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass mb-10 flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-orange-500 text-white">
                <PartyPopper className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">
                  MEGA STUDENT SUMMIT 2024 — Register Now!
                </p>
                <p className="text-xs text-white/55">
                  15th March • Free Entry • ₹10L+ Prizes
                </p>
              </div>
              <Link to={createPageUrl("StudentEventLanding")}>
                <Button
                  size="sm"
                  className="rounded-lg bg-white text-[#0b1410] hover:bg-white/90"
                >
                  Mehr erfahren
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => setShowEventBanner(false)}
                aria-label="Hinweis schließen"
                className="grid h-8 w-8 place-items-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center lg:text-left"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                #1 KI-Lebenslauf-Editor
              </div>

              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Finde deinen
                <span className="text-gradient-mint"> Traumjob</span>
                <br />
                mit KI-Unterstützung
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0">
                Erstelle ATS-optimierte Lebensläufe mit KI-Inhalten, echtem Job-Abgleich und professionellen Vorlagen. Schließe dich über 50.000 Bewerbern an.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/60 lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-400" />
                  50.000+ Nutzer
                </span>
                <span className="inline-flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-400" />
                  94 % Erfolgsquote
                </span>
                <span className="inline-flex items-center gap-2">
                  <Globe className="h-4 w-4 text-emerald-400" />
                  Weltweit verfügbar
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link to={createPageUrl("Templates")}>
                  <Button
                    size="lg"
                    className="group w-full rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-7 py-6 text-base font-semibold text-[#04120c] shadow-lg shadow-emerald-500/20 transition hover:from-emerald-300 hover:to-teal-400 sm:w-auto"
                  >
                    Kostenlos starten
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Jobs")}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-xl border-white/15 bg-white/[0.03] px-7 py-6 text-base font-semibold text-white/85 transition hover:border-emerald-400/40 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  >
                    Stellen ansehen
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 text-xs text-white/45 lg:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
                  Keine Kreditkarte
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
                  Dauerhaft kostenlos
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative flex h-[420px] items-center justify-center sm:h-[480px] lg:h-[520px]"
            >
              <div className="absolute h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl sm:h-96 sm:w-96" />
              <FloatingResume2D />

              <motion.div
                className="glass absolute right-0 top-4 rounded-xl px-3 py-2 sm:right-4"
                animate={{ y: [-6, 6] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="flex items-center gap-2 text-emerald-300">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-semibold">ATS-Wert: 98%</span>
                </div>
              </motion.div>

              <motion.div
                className="glass absolute bottom-10 left-0 rounded-xl px-3 py-2 sm:left-4"
                animate={{ y: [6, -6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.6,
                }}
              >
                <div className="flex items-center gap-2 text-sky-300">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-semibold">Job-Passung: 94%</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "50K+", label: "Erstellte Lebensläufe" },
              { value: "94%", label: "Einladungen zum Gespräch" },
              { value: "40+", label: "ATS-Vorlagen" },
              { value: "2 min", label: "Einrichtungszeit" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.05}>
                <div className="glass rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-semibold text-white sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wide text-white/45">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Benefits                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mb-12 text-center">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
              Warum ResumeAI
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Starke Funktionen, echter Vorteil
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/55">
              Alles, was du vom leeren Blatt bis zur fertigen Bewerbung brauchst.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.07}>
                <div className="glass glass-hover h-full rounded-2xl p-5">
                  <div
                    className={`mb-4 grid h-11 w-11 place-items-center rounded-xl border bg-gradient-to-br ${benefit.tint}`}
                  >
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {benefit.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mb-12 text-center">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
              Ablauf
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              So funktioniert's
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/55">
              Vom Entwurf zum fertigen Lebenslauf in 4 Schritten.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.07}>
                <div className="glass glass-hover relative h-full overflow-hidden rounded-2xl p-5">
                  <span className="absolute right-4 top-3 font-mono text-3xl font-bold text-white/[0.06]">
                    {step.step}
                  </span>
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mb-12 text-center">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
              Stimmen
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Beliebt bei Jobsuchenden weltweit
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/55">
              Tausende haben ihren Traumjob gefunden.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <figure className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-white/15"
                    />
                    <div>
                      <figcaption className="text-sm font-semibold text-white">
                        {testimonial.name}
                      </figcaption>
                      <p className="text-xs text-white/50">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-white/70">
                    “{testimonial.testimonial}”
                  </blockquote>
                  <div className="mt-4 flex gap-0.5 text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <FileText className="h-3.5 w-3.5" />
              Kostenlos starten
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              Über 50.000 Menschen haben mit ResumeAI ihren Traumjob gefunden. Starte jetzt deinen Lebenslauf.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to={createPageUrl("Templates")}>
                <Button
                  size="lg"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-7 py-6 text-base font-semibold text-[#04120c] shadow-lg shadow-emerald-500/20 transition hover:from-emerald-300 hover:to-teal-400 sm:w-auto"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Kostenlos starten
                </Button>
              </Link>
              <Link to={createPageUrl("About")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl border-white/15 bg-transparent px-7 py-6 text-base font-semibold text-white/85 transition hover:border-emerald-400/40 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                >
                  Mehr erfahren
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
                Keine Kreditkarte nötig
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
                Dauerhaft kostenlos
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />
                In 2 Minuten startklar
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
