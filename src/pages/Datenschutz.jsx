import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Database, Server, Sparkles, Image as ImageIcon,
  Mail, UserCheck, Lock, ScrollText, ArrowLeft, AlertTriangle,
} from "lucide-react";
import { createPageUrl } from "@/utils";

const STAND = "3. November 2026";

const sections = [
  { id: "verantwortlicher", label: "Verantwortlicher" },
  { id: "kurzfassung", label: "Das Wichtigste" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "browser", label: "Speicherung im Browser" },
  { id: "hosting", label: "Hosting" },
  { id: "ki", label: "KI-Funktionen" },
  { id: "extern", label: "Externe Bilder" },
  { id: "kontakt", label: "Kontaktaufnahme" },
  { id: "rechte", label: "Ihre Rechte" },
];

function Section({ icon: Icon, id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="space-y-3 pl-11 text-sm leading-relaxed text-white/65">{children}</div>
    </section>
  );
}

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#070b09] pb-24 pt-24 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <Link
          to={createPageUrl("Start")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>

        <div className="mb-10 border-b border-white/10 pb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" /> DSGVO / GDPR
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Datenschutzerklärung</h1>
          <p className="mt-3 text-sm text-white/50">
            Stand: {STAND} · Gültig für ResumeAI unter{" "}
            <span className="text-white/70">rintuchowdory.github.io/resume-craft-ai</span>
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="space-y-10">
          <Section icon={UserCheck} id="verantwortlicher" title="1. Verantwortlicher">
            <p>Verantwortlich für die Datenverarbeitung in dieser Anwendung ist:</p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-medium text-white">Rintu Chowdory</p>
              <p>52499 Baesweiler, Deutschland</p>
              <p>
                E-Mail:{" "}
                <a href="mailto:rintuchowdory@yahoo.com" className="text-emerald-300 hover:underline">
                  rintuchowdory@yahoo.com
                </a>
              </p>
            </div>
            <p>
              Ein Datenschutzbeauftragter ist nicht bestellt, da die gesetzlichen Voraussetzungen
              hierfür nicht vorliegen.
            </p>
          </Section>

          <Section icon={ScrollText} id="kurzfassung" title="2. Das Wichtigste in Kürze">
            <ul className="space-y-2">
              <li>
                <strong className="text-white">Kein Konto, keine Anmeldung.</strong> Die Anwendung
                läuft vollständig in Ihrem Browser.
              </li>
              <li>
                <strong className="text-white">Ihre Lebensläufe bleiben auf Ihrem Gerät.</strong>{" "}
                Sie werden im lokalen Speicher des Browsers abgelegt und nicht an einen Server
                übertragen.
              </li>
              <li>
                <strong className="text-white">Keine Cookies, kein Tracking, keine Werbung.</strong>{" "}
                Es werden keine Analyse- oder Marketingdienste eingesetzt.
              </li>
              <li>
                <strong className="text-white">Ausnahme: KI-Funktionen.</strong> Wenn Sie eine
                KI-Funktion aktiv nutzen, wird der eingegebene Text zur Verarbeitung an einen
                KI-Dienst übermittelt (Ziffer 6).
              </li>
              <li>
                <strong className="text-white">Keine Weitergabe zu Werbezwecken</strong> und keine
                Profilbildung.
              </li>
            </ul>
          </Section>

          <Section icon={Lock} id="cookies" title="3. Cookies, Tracking und Analyse">
            <p>
              Diese Anwendung setzt <strong className="text-white">keine Cookies</strong> zu
              Analyse-, Marketing- oder Trackingzwecken. Es werden keine Dienste wie Google
              Analytics, Matomo, Plausible, PostHog oder vergleichbare Werkzeuge eingesetzt, und es
              werden keine Nutzungsprofile gebildet.
            </p>
            <p>
              Technisch notwendige Speicherung erfolgt ausschließlich im lokalen Speicher Ihres
              Browsers (localStorage), siehe Ziffer 4. Eine Einwilligung nach § 25 Abs. 1 TDDDG ist
              dafür nicht erforderlich, weil die Speicherung dem von Ihnen angeforderten Zweck
              dient (§ 25 Abs. 2 Nr. 2 TDDDG).
            </p>
          </Section>

          <Section icon={Database} id="browser" title="4. Speicherung im Browser (localStorage)">
            <p>
              Alle Inhalte, die Sie erstellen, werden ausschließlich lokal in Ihrem Browser
              gespeichert. Es findet keine Übertragung an uns statt. Verwendet werden zwei
              Speicherbereiche:
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.04] text-white/70">
                  <tr>
                    <th className="px-4 py-3 font-medium">Schlüssel</th>
                    <th className="px-4 py-3 font-medium">Inhalt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/60">
                  <tr>
                    <td className="px-4 py-3 font-mono text-[11px] text-emerald-300">resumeai_db_v2</td>
                    <td className="px-4 py-3">
                      Lebensläufe, Anschreiben, Stellenanzeigen, Einstellungen der Anwendung
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-[11px] text-emerald-300">
                      resumeai_profile_v1
                    </td>
                    <td className="px-4 py-3">Ihr lokales Profil (Name, Kontaktdaten, Foto)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong className="text-white">Zweck:</strong> Bereitstellung der von Ihnen
              angeforderten Funktionen. <strong className="text-white">Rechtsgrundlage:</strong>{" "}
              Art. 6 Abs. 1 lit. b DSGVO (Nutzung der Anwendung) bzw. Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an einer technisch einfachen, datensparsamen Umsetzung).
            </p>
            <p>
              <strong className="text-white">Löschung:</strong> Sie können die Daten jederzeit
              selbst löschen, indem Sie den lokalen Speicher bzw. die Websitedaten in Ihren
              Browsereinstellungen entfernen. Einzelne Lebensläufe lassen sich auch innerhalb der
              Anwendung löschen.
            </p>
            <p className="rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4 text-amber-200/80">
              <AlertTriangle className="mr-2 inline h-4 w-4 align-[-2px]" />
              Bitte beachten Sie: Weil die Daten nur lokal liegen, sind sie an dieses Gerät und
              diesen Browser gebunden. Auf einem anderen Gerät oder nach dem Löschen der
              Websitedaten sind sie nicht mehr verfügbar. Legen Sie wichtige Lebensläufe zusätzlich
              als PDF ab.
            </p>
          </Section>

          <Section icon={Server} id="hosting" title="5. Hosting und Server-Logfiles">
            <p>
              Die Anwendung wird als statische Website über <strong className="text-white">GitHub
              Pages</strong> bereitgestellt. Anbieter ist die GitHub Inc., 88 Colin P. Kelly Jr.
              Street, San Francisco, CA 94107, USA (Unternehmen der Microsoft-Gruppe).
            </p>
            <p>
              Beim Aufruf der Seite verarbeitet GitHub technisch notwendige Daten, insbesondere Ihre
              IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Datei, übertragene
              Datenmenge, Browsertyp und Betriebssystem. Diese Verarbeitung ist für die Auslieferung
              der Seite erforderlich. <strong className="text-white">Rechtsgrundlage:</strong> Art.
              6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten
              Bereitstellung).
            </p>
            <p>
              GitHub ist unter dem EU-US Data Privacy Framework zertifiziert; ergänzend stützt sich
              die Übermittlung in die USA auf Standardvertragsklauseln. Weitere Informationen finden
              Sie in der Datenschutzerklärung von GitHub.
            </p>
            <p>
              Wir selbst betreiben keinen eigenen Webserver für diese Anwendung und werten die
              Zugriffsdaten nicht aus.
            </p>
          </Section>

          <Section icon={Sparkles} id="ki" title="6. KI-Funktionen (Texterstellung, ATS-Prüfung, Anschreiben)">
            <p>
              Einige Funktionen nutzen ein Sprachmodell, zum Beispiel der KI-Assistent im Editor,
              die ATS-Prüfung, der Anschreiben-Generator und der Stellenabgleich. Diese Funktionen
              sind <strong className="text-white">optional</strong> und werden nur ausgeführt, wenn
              Sie sie aktiv auslösen.
            </p>
            <p>Bei einer solchen Anfrage werden übermittelt:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>der Text, den Sie in die KI-Funktion eingeben bzw. der betroffene Lebenslauf-Abschnitt,</li>
              <li>gegebenenfalls die von Ihnen ausgewählte Stellenanzeige,</li>
              <li>technische Angaben zur Anfrage (z. B. gewünschte Antwortlänge).</li>
            </ul>
            <p>
              Der Transport erfolgt über eine Schnittstelle, die vom Betreiber dieser Anwendung
              auf <strong className="text-white">Render</strong> (Render Services, Inc., USA;
              Rechenzentrum Frankfurt am Main) betrieben wird. Von dort wird die Anfrage an die{" "}
              <strong className="text-white">Google Gemini API</strong> der Google Ireland Limited,
              Gordon House, Barrow Street, Dublin 4, Irland, weitergeleitet und dort verarbeitet.
            </p>
            <p>
              <strong className="text-white">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
              (Erbringung der von Ihnen angeforderten Funktion), bei freiwilliger Nutzung zusätzlich
              Art. 6 Abs. 1 lit. a DSGVO. Die Anfrage wird nicht zur Profilbildung verwendet.
            </p>
            <p className="rounded-xl border border-amber-500/25 bg-amber-500/[0.07] p-4 text-amber-200/80">
              <AlertTriangle className="mr-2 inline h-4 w-4 align-[-2px]" />
              Geben Sie in KI-Funktionen keine besonders sensiblen Daten ein (z. B. Gesundheitsdaten,
              Religion, Gewerkschaftszugehörigkeit), die für eine Bewerbung nicht erforderlich sind.
              Nutzen Sie die KI-Funktionen nur, wenn Sie mit dieser Übermittlung einverstanden sind.
            </p>
          </Section>

          <Section icon={ImageIcon} id="extern" title="7. Externe Bilder und Links">
            <p>
              Einzelne Seiten (etwa „About") laden Bilder von{" "}
              <strong className="text-white">images.unsplash.com</strong> (Unsplash Inc., USA). Beim
              Laden wird Ihre IP-Adresse an Unsplash übertragen.{" "}
              <strong className="text-white">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (einheitliche Darstellung der Seite).
            </p>
            <p>
              Verweise auf externe Netzwerke (GitHub, LinkedIn, X/Twitter, WhatsApp) sind reine
              Links. Es werden keine Daten übertragen, solange Sie nicht darauf klicken. Für die
              Verarbeitung auf den verlinkten Seiten gelten deren eigene Datenschutzhinweise.
            </p>
          </Section>

          <Section icon={Mail} id="kontakt" title="8. Kontaktaufnahme">
            <p>
              Wenn Sie uns per E-Mail schreiben, verarbeiten wir Ihre E-Mail-Adresse und den Inhalt
              der Nachricht zur Bearbeitung Ihrer Anfrage.{" "}
              <strong className="text-white">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
              (bei vertragsbezogenen Anfragen) bzw. Art. 6 Abs. 1 lit. f DSGVO (allgemeine
              Anfragen). Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist
              und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
            <p>
              Das Kontaktformular in dieser Anwendung ist eine reine Eingabemaske ohne
              Serveranbindung: Beim Absenden werden{" "}
              <strong className="text-white">keine Daten übertragen oder gespeichert</strong>. Bitte
              nutzen Sie für echte Anfragen die oben genannte E-Mail-Adresse.
            </p>
          </Section>

          <Section icon={ShieldCheck} id="rechte" title="9. Ihre Rechte als betroffene Person">
            <p>Sie haben nach der DSGVO folgende Rechte:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO),</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
              <li>Löschung (Art. 17 DSGVO),</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
              <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO),</li>
              <li>Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).</li>
            </ul>
            <p>
              Für die meisten Daten ist das Löschen sehr einfach: Sie liegen ausschließlich in Ihrem
              Browser und können dort jederzeit entfernt werden (Ziffer 4).
            </p>
            <p>
              Zur Ausübung Ihrer Rechte genügt eine Nachricht an{" "}
              <a href="mailto:rintuchowdory@yahoo.com" className="text-emerald-300 hover:underline">
                rintuchowdory@yahoo.com
              </a>
              .
            </p>
            <p>
              <strong className="text-white">Beschwerderecht:</strong> Sie können sich bei der
              zuständigen Aufsichtsbehörde beschweren. Zuständig ist die Landesbeauftragte für
              Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), Kavalleriestraße
              2–4, 40213 Düsseldorf.
            </p>
          </Section>

          <Section icon={Lock} id="sicherheit" title="10. Keine Weitergabe, Datensicherheit">
            <p>
              Ihre Daten werden nicht an Dritte verkauft oder zu Werbezwecken weitergegeben. Es
              findet keine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne des
              Art. 22 DSGVO statt. Die ATS-Bewertung ist eine reine Orientierungshilfe und ersetzt
              keine menschliche Entscheidung.
            </p>
            <p>
              Die Website wird ausschließlich über eine verschlüsselte HTTPS-Verbindung (TLS)
              ausgeliefert. Es besteht keine Pflicht, Daten bereitzustellen; ohne Angaben können
              einige Funktionen jedoch nicht genutzt werden.
            </p>
          </Section>

          <Section icon={ScrollText} id="aenderungen" title="11. Änderungen dieser Erklärung">
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich die Anwendung oder die
              rechtlichen Rahmenbedingungen ändern. Es gilt jeweils die oben angegebene Fassung.
            </p>
          </Section>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/50">
              Summary in English
            </h2>
            <p className="text-sm leading-relaxed text-white/60">
              ResumeAI runs entirely in your browser. There is no account and no server-side
              database: your resumes, cover letters and profile are stored in your browser's local
              storage and never uploaded. We use no cookies, no analytics and no advertising
              trackers. Two exceptions: the site is hosted on GitHub Pages, which processes
              standard access logs including your IP address, and the optional AI features send the
              text you submit to our proxy on Render (Frankfurt), which forwards it to the Google
              Gemini API. Some pages load decorative images from Unsplash. You have the rights
              granted by Art. 15–21 GDPR; contact{" "}
              <a href="mailto:rintuchowdory@yahoo.com" className="text-emerald-300 hover:underline">
                rintuchowdory@yahoo.com
              </a>
              , or lodge a complaint with the LDI NRW (Düsseldorf, Germany).
            </p>
          </div>
        </div>

        <p className="mt-12 text-xs text-white/35">
          Diese Erklärung beschreibt die tatsächliche Datenverarbeitung dieser Anwendung. Sie stellt
          keine Rechtsberatung dar.
        </p>
      </div>
    </div>
  );
}
