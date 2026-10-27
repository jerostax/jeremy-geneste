import Image from "next/image";
import { content } from "@/content";
import { buildPersonJsonLd, serializeJsonLd } from "@/lib/seo";
import { localePath, person, type Locale } from "@/lib/site";

function SectionHeading({ id, index, title }: { id: string; index: string; title: string }) {
  return (
    <header className="mb-12 md:mb-16">
      <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-muted">
        <span>{index}</span>
        <span aria-hidden className="draw-rule h-px flex-1 bg-line" />
      </div>
      <h2 id={id} className="mt-6 font-serif text-5xl leading-none md:text-7xl">
        {title}
      </h2>
    </header>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline">
      {children}
      <span aria-hidden> ↗</span>
    </a>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildPersonJsonLd(locale, t)) }}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <nav className="flex items-center justify-between py-6 font-mono text-xs tracking-[0.15em] uppercase">
          <a href={localePath[locale]} className="text-paper">
            J<span className="text-accent">.</span>G
          </a>
          <ul className="flex items-center gap-6 text-muted">
            <li className="hidden md:block"><a href="#work" className="hover:text-paper">{t.nav.work}</a></li>
            <li className="hidden md:block"><a href="#path" className="hover:text-paper">{t.nav.path}</a></li>
            <li className="hidden md:block"><a href="#projects" className="hover:text-paper">{t.nav.projects}</a></li>
            <li className="hidden md:block"><a href="#contact" className="hover:text-paper">{t.nav.contact}</a></li>
            <li>
              <a
                href={localePath[otherLocale]}
                hrefLang={otherLocale}
                lang={otherLocale}
                aria-label={t.nav.switchLanguageLabel}
                className="border border-line px-2 py-1 text-paper hover:border-accent"
              >
                {t.nav.switchLanguage}
              </a>
            </li>
          </ul>
        </nav>

        <main>
          {/* Hero */}
          <section className="grid gap-12 pt-10 pb-24 md:grid-cols-12 md:pt-20 md:pb-36">
            <div className="md:col-span-8">
              <p className="reveal font-mono text-xs tracking-[0.2em] text-muted uppercase">
                <span aria-hidden className="mr-3 inline-block size-2 bg-accent align-middle" />
                {t.hero.kicker}
              </p>
              <h1 className="reveal reveal-delay-1 mt-8 font-serif text-[clamp(4.5rem,15vw,12.5rem)] leading-[0.85] tracking-[-0.02em]">
                <span className="block">Jérémy</span>
                <span className="block italic">
                  Geneste<span className="text-accent not-italic">.</span>
                </span>
              </h1>
              <p className="reveal reveal-delay-2 mt-10 max-w-2xl text-lg leading-relaxed text-paper/85 md:text-xl">
                {t.hero.intro}
              </p>
              <p className="reveal reveal-delay-2 mt-6 font-mono text-sm text-muted">{t.hero.availability}</p>
              <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-4">
                <a href={`mailto:${person.email}`} className="font-serif text-3xl italic link-underline md:text-4xl">
                  {t.hero.emailCta}
                  <span aria-hidden className="text-accent not-italic"> →</span>
                </a>
                <span className="font-mono text-sm text-muted">
                  <ExternalLink href={person.links.linkedin}>LinkedIn</ExternalLink>
                  <span aria-hidden className="mx-3">/</span>
                  <ExternalLink href={person.links.github}>GitHub</ExternalLink>
                </span>
              </div>
            </div>

            <figure className="reveal reveal-delay-2 md:col-span-4 md:self-end">
              <div className="portrait relative aspect-[4/5] overflow-hidden">
                <Image
                  src={person.photo}
                  alt={t.hero.photoAlt}
                  width={1000}
                  height={1000}
                  preload
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="h-full w-full object-cover object-[50%_30%]"
                />
              </div>
              <figcaption className="mt-3 flex justify-between font-mono text-[0.7rem] tracking-[0.15em] text-muted uppercase">
                <span>Fig. 01</span>
                <span>{t.hero.photoCaption}</span>
              </figcaption>
            </figure>
          </section>

          {/* Case study */}
          <section aria-labelledby="work" className="py-20 md:py-28">
            <SectionHeading id="work" index="01" title={t.caseStudy.heading} />
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <h3 className="font-serif text-4xl italic md:text-5xl">{t.caseStudy.client}</h3>
                <p className="mt-4 font-mono text-xs leading-relaxed tracking-[0.1em] text-muted uppercase">
                  {t.caseStudy.role}
                </p>
                <p className="mt-8 text-lg leading-relaxed text-paper/85">{t.caseStudy.intro}</p>
                <ul className="mt-8 space-y-4">
                  {t.caseStudy.points.map((point) => (
                    <li key={point} className="dash-item leading-relaxed text-paper/80">
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-mono text-xs leading-relaxed text-muted">{t.caseStudy.stack}</p>
                <p className="mt-8 font-mono text-sm">
                  <ExternalLink href="https://www.delangeimmobilier.com">{t.caseStudy.visit}</ExternalLink>
                </p>
              </div>

              <div className="md:col-span-6 md:col-start-7">
                <dl className="divide-y divide-line border-y border-line">
                  {t.caseStudy.metrics.map((metric) => (
                    <div key={metric.label} className="metric py-10">
                      <dt className="font-mono text-xs tracking-[0.15em] text-muted uppercase">{metric.label}</dt>
                      <dd className="mt-4 flex flex-wrap items-baseline gap-x-6 font-serif leading-none">
                        <s className="strike text-[clamp(2.5rem,6vw,4.5rem)] text-muted no-underline">
                          {metric.before}
                        </s>
                        <span aria-hidden className="font-mono text-2xl text-muted">→</span>
                        <span className="metric-after text-[clamp(4rem,11vw,8.5rem)] text-accent">{metric.after}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 font-mono text-xs text-muted">{t.caseStudy.metricsSource}</p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section aria-labelledby="path" className="py-20 md:py-28">
            <SectionHeading id="path" index="02" title={t.path.heading} />
            <ol className="border-t border-line">
              {t.path.entries.map((entry) => (
                <li key={entry.company} className="grid gap-6 border-b border-line py-10 md:grid-cols-12">
                  <p className="font-mono text-sm text-accent md:col-span-3">{entry.period}</p>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-3xl md:text-4xl">{entry.company}</h3>
                    <p className="mt-2 font-mono text-xs tracking-[0.1em] text-muted uppercase">
                      {entry.role} · {entry.place}
                    </p>
                    {entry.points && (
                      <ul className="mt-6 space-y-3">
                        {entry.points.map((point) => (
                          <li key={point} className="dash-item leading-relaxed text-paper/80">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    {entry.missions && (
                      <dl className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
                        {entry.missions.map((mission) => (
                          <div key={mission.client}>
                            <dt className="font-medium text-paper">{mission.client}</dt>
                            <dd className="mt-2 leading-relaxed text-paper/75">{mission.summary}</dd>
                            <dd className="mt-2 font-mono text-xs text-muted">{mission.stack}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Projects */}
          <section aria-labelledby="projects" className="py-20 md:py-28">
            <SectionHeading id="projects" index="03" title={t.projects.heading} />
            <div className="grid gap-16 md:grid-cols-2 md:gap-10">
              {t.projects.items.map((project) => (
                <article key={project.title} className="border-t border-paper/60 pt-8">
                  <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">{project.status}</p>
                  <h3 className="mt-4 font-serif text-3xl md:text-4xl">{project.title}</h3>
                  <p className="mt-6 leading-relaxed text-paper/80">{project.text}</p>
                  {project.points && (
                    <ul className="mt-6 space-y-3">
                      {project.points.map((point) => (
                        <li key={point} className="dash-item leading-relaxed text-paper/75">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-6 font-mono text-xs text-muted">{project.stack}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section aria-labelledby="skills" className="py-20 md:py-28">
            <SectionHeading id="skills" index="04" title={t.skills.heading} />
            <dl className="border-t border-line">
              {t.skills.groups.map((group) => (
                <div key={group.label} className="grid gap-2 border-b border-line py-6 md:grid-cols-12">
                  <dt className="font-mono text-xs tracking-[0.15em] text-muted uppercase md:col-span-3 md:pt-1">
                    {group.label}
                  </dt>
                  <dd className="text-lg text-paper/85 md:col-span-9">{group.items}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-xs text-muted">{t.skills.languages}</p>
          </section>

          {/* Contact */}
          <section aria-labelledby="contact" className="py-24 md:py-36">
            <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-muted">
              <span>05</span>
              <span aria-hidden className="draw-rule h-px flex-1 bg-line" />
            </div>
            <h2 id="contact" className="mt-10 font-serif text-[clamp(4rem,13vw,11rem)] leading-[0.9] italic">
              {t.contact.heading}
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/80">{t.contact.text}</p>
            <a
              href={`mailto:${person.email}`}
              className="mt-10 inline-block font-serif text-[clamp(1.6rem,5vw,3.5rem)] break-all text-accent link-underline"
            >
              {person.email}
            </a>
            <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-muted">
              <ExternalLink href={person.links.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink href={person.links.github}>GitHub</ExternalLink>
              {t.contact.cvFile && (
                <a href={t.contact.cvFile} download className="link-underline">
                  {t.contact.cvLabel}
                  <span aria-hidden> ↓</span>
                </a>
              )}
            </p>
          </section>
        </main>

        <footer className="flex flex-col gap-3 border-t border-line py-8 font-mono text-[0.7rem] leading-relaxed text-muted md:flex-row md:justify-between">
          <p>
            © {person.name} · {t.footer.builtWith}
          </p>
          <p>{t.footer.hosting}</p>
        </footer>
      </div>
    </>
  );
}
