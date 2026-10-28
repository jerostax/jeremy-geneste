import Image from "next/image";
import { content } from "@/content";
import type { Figure } from "@/content/types";
import { buildPersonJsonLd, serializeJsonLd } from "@/lib/seo";
import { localePath, person, type Locale } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { ElevationProfile } from "./ElevationProfile";
import { PageEffects } from "./PageEffects";

// "3,7 Mo" and "4,0 s" keep one decimal, like the measured values; "21 Mo" stays whole.
function formatFigure(value: number, unit: string, locale: string, minimumFractionDigits: number) {
  return `${value.toLocaleString(locale, { minimumFractionDigits, maximumFractionDigits: 1 })} ${unit}`;
}

function FigureCard({ figure, locale }: { figure: Figure; locale: string }) {
  const after = formatFigure(figure.to, figure.unit, locale, 1);
  return (
    <div data-figure data-from={figure.from} data-to={figure.to} data-unit={figure.unit}
      className="rounded-xl bg-panel px-4 pt-3.5 pb-4 text-sm text-muted">
      {figure.label}
      <p className="mt-1 flex items-baseline gap-2">
        {/* The final value is in the HTML; the animation only replays the count-down. */}
        <span data-value data-final={after} className="text-[28px] font-semibold tracking-tight text-paper tabular-nums">{after}</span>
        <s className="text-[15px]">{formatFigure(figure.from, figure.unit, locale, figure.from % 1 ? 1 : 0)}</s>
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-panel-strong">
        <div data-bar className="figure-bar h-full rounded-full bg-accent" style={{ width: `${(figure.to / figure.from) * 100}%` }} />
      </div>
    </div>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-8 border-b border-line pb-3 text-[15px] font-semibold text-muted">
      {children}
    </h2>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const sectionIds = { parcours: "parcours", projects: "projets", skills: "competences", contact: "contact" } as const;
  const navItems = (Object.keys(sectionIds) as (keyof typeof sectionIds)[]).map((key) => ({
    href: `#${sectionIds[key]}`,
    label: t.sidebar.nav[key],
  }));
  const leadWords = t.lead.split(" ");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildPersonJsonLd(locale, t)) }} />
      <PageEffects numberLocale={t.numberLocale} />

      <div className="mx-auto grid max-w-[1240px] gap-9 px-4 py-6 sm:px-10 sm:py-10 lg:grid-cols-[300px_1fr] lg:gap-[72px]">
        <aside className="self-start lg:sticky lg:top-10">
          <Image src={person.photo} alt={t.sidebar.photoAlt} width={336} height={336} preload
            className="enter size-[168px] rounded-full object-cover object-[50%_28%]" style={{ "--i": 0 } as React.CSSProperties} />
          <h1 className="enter mt-5.5 font-display text-4xl font-semibold tracking-[-0.02em]" style={{ "--i": 1 } as React.CSSProperties}>
            {person.name}
          </h1>
          <p className="enter mt-1.5 text-[17px] text-muted" style={{ "--i": 2 } as React.CSSProperties}>{t.sidebar.role}</p>
          <p className="enter mt-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[14px] font-medium text-paper" style={{ "--i": 2 } as React.CSSProperties}>
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            {t.sidebar.status}
          </p>
          <ul className="enter mt-5 text-[15px] leading-[1.9] text-soft" style={{ "--i": 3 } as React.CSSProperties}>
            {t.sidebar.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
          <nav aria-label={t.sidebar.navLabel} className="enter relative mt-6 hidden flex-col pl-4 text-[15px] lg:flex" style={{ "--i": 4 } as React.CSSProperties}>
            <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 rounded bg-line" />
            <span aria-hidden data-toc-indicator className="toc-indicator absolute top-0 left-0 h-0 w-0.5 rounded bg-accent opacity-0" />
            {navItems.map((item) => (
              <a key={item.href} href={item.href} data-toc-link
                className="py-1.5 text-muted transition-colors hover:text-paper data-[active]:text-paper">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="enter mt-6.5 block rounded-lg bg-accent py-3 text-center font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-10px_rgba(111,178,255,0.55)]"
            style={{ "--i": 5 } as React.CSSProperties}>
            {t.sidebar.writeCta}
          </a>
          <p className="enter mt-3.5 flex flex-wrap gap-x-4.5 gap-y-1 text-[15px]" style={{ "--i": 6 } as React.CSSProperties}>
            <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">LinkedIn</a>
            <a href={person.links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">GitHub</a>
            {t.sidebar.cvFile && <a href={t.sidebar.cvFile} className="underline underline-offset-2">{t.sidebar.cv}</a>}
          </p>
          <p className="enter mt-2.5 text-[15px] text-muted" style={{ "--i": 7 } as React.CSSProperties}>
            <a href={localePath[otherLocale]} hrefLang={otherLocale} lang={otherLocale} className="underline underline-offset-2 hover:text-paper">
              {t.sidebar.switchLanguage}
            </a>
          </p>
        </aside>

        <main>
          <p className="max-w-[24ch] font-display text-[clamp(1.9rem,3.2vw,2.9rem)] leading-[1.12] font-semibold tracking-[-0.025em]">
            {leadWords.map((word, i) => (
              <span key={i}>
                <span className="lead-word" style={{ "--i": i } as React.CSSProperties}>{word}</span>
                {i < leadWords.length - 1 && " "}
              </span>
            ))}
          </p>
          <p className="enter-late mt-4.5 max-w-[56ch] text-[17px] leading-relaxed text-muted">{t.now}</p>

          <section aria-labelledby={sectionIds.parcours} className="mt-14">
            <SectionTitle id={sectionIds.parcours}>{t.sections.parcours}</SectionTitle>
            <ElevationProfile copy={t.ascent} anchors={[...t.timeline.map((entry) => entry.id), sectionIds.contact]} />
            <div>
              <ol>
                {t.timeline.map((entry) => (
                  <li key={entry.id} id={entry.id} className="scroll-mt-8 grid gap-1 border-b border-line py-5.5 lg:grid-cols-[110px_1fr] lg:gap-6">
                    <span className="pt-0.5 text-[15px] text-muted tabular-nums">{entry.period}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.01em]">{entry.company}</h3>
                      <p className="mt-0.5 text-[15px] text-muted">{entry.role}</p>
                      {entry.text && <p className="mt-2.5 max-w-[64ch] leading-relaxed text-soft">{entry.text}</p>}
                      {entry.figures && (
                        <div className="mt-4 grid max-w-[560px] gap-3 sm:grid-cols-2">
                          {entry.figures.map((figure) => <FigureCard key={figure.label} figure={figure} locale={t.numberLocale} />)}
                        </div>
                      )}
                      {entry.missions && (
                        <ul className="mt-3">
                          {entry.missions.map((mission) => (
                            <li key={mission.name} className="group -mx-3 rounded-lg px-3 py-2 text-[15px] leading-relaxed text-soft transition-colors hover:bg-panel">
                              <b className="font-semibold text-paper transition-colors group-hover:text-accent">{mission.name}</b>{" "}
                              {mission.text} <span className="text-muted">{mission.stack}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {(entry.stack || entry.link) && (
                        <p className="mt-2 text-sm text-muted">
                          {entry.stack}{" "}
                          {entry.link && (
                            <a href={entry.link.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-paper">
                              {entry.link.label}
                            </a>
                          )}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section aria-labelledby={sectionIds.projects} className="mt-14">
            <SectionTitle id={sectionIds.projects}>{t.sections.projects}</SectionTitle>
            {t.projects.map((project) => (
              <article key={project.title} className="border-b border-line py-5.5">
                <h3 className="text-xl font-semibold tracking-[-0.01em]">{project.title}</h3>
                <p className="mt-0.5 text-[15px] text-muted">{project.context}</p>
                <p className="mt-2.5 max-w-[64ch] leading-relaxed text-soft">{project.text}</p>
                <p className="mt-2 text-sm text-muted">{project.stack}</p>
              </article>
            ))}
          </section>

          <section aria-labelledby={sectionIds.skills} className="mt-14">
            <SectionTitle id={sectionIds.skills}>{t.sections.skills}</SectionTitle>
            <dl className="grid gap-x-6 pt-4.5 sm:grid-cols-[170px_1fr] sm:gap-y-3">
              {t.skills.map((group) => (
                <div key={group.label} className="contents">
                  <dt className="text-[15px] text-muted">{group.label}</dt>
                  <dd className="mb-2.5 text-soft sm:mb-0">{group.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Not in the sidebar nav on purpose: a short personal note, not a main section. */}
          <section aria-labelledby="dehors" className="mt-14">
            <SectionTitle id="dehors">{t.sections.outside}</SectionTitle>
            <div className="mt-5 grid items-center gap-6 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-8">
              <Image src="/images/jeremy-geneste-alpinisme.jpg" alt={t.outside.photoAlt} width={900} height={1200}
                sizes="(min-width: 640px) 220px, 100vw" className="aspect-[3/4] w-full max-w-[260px] rounded-xl object-cover" />
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-soft">{t.outside.text}</p>
            </div>
          </section>

          <section aria-labelledby={sectionIds.contact} className="mt-14">
            <SectionTitle id={sectionIds.contact}>{t.sections.contact}</SectionTitle>
            <p className="mt-4.5 max-w-[34ch] font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug font-semibold tracking-[-0.01em]">
              {t.contact.heading}
            </p>
            <ContactForm copy={t.contact.form} email={person.email} />
          </section>

          <footer className="mt-14 pb-6 text-[13px] text-muted">{t.footer}</footer>
        </main>
      </div>
    </>
  );
}
