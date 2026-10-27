import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Jérémy Geneste — Full-stack developer, React, Next.js, Node.js",
    description:
      "Jérémy Geneste, full-stack JavaScript developer since 2019, based in Paris, France: React, Next.js, TypeScript and Node.js. Business web applications, APIs, integrations, technical SEO and performance.",
    jobTitle: "Full-stack JavaScript developer",
    ogTagline: "Full-stack developer · React · Next.js · Node.js",
  },
  nav: {
    work: "Case study",
    path: "Experience",
    projects: "Projects",
    contact: "Contact",
    switchLanguage: "FR",
    switchLanguageLabel: "Lire en français",
  },
  hero: {
    kicker: "Full-stack developer · Paris, France · since 2019",
    intro:
      "I design, take over and evolve business web applications, from the interface down to the database: React, Next.js, TypeScript and Node.js, plus the integrations around them (Salesforce, Jira, third-party APIs).",
    availability: "Open to opportunities, in French or in English.",
    emailCta: "Email me",
    photoAlt: "Portrait of Jérémy Geneste, full-stack developer",
    photoCaption: "Jérémy Geneste, Paris",
  },
  caseStudy: {
    heading: "Case study",
    client: "Delange Immobilier",
    role: "Freelance full-stack developer · since October 2026 · sole technical contact",
    intro:
      "Took over a live Next.js 15 / React 19 real-estate application: audit, security, infrastructure migration, SEO and performance.",
    metrics: [
      { before: "21 MB", after: "3.7 MB", label: "homepage weight" },
      { before: "88.7 s", after: "4.0 s", label: "main content display (mobile LCP)" },
    ],
    metricsSource: "PageSpeed Insights measurements, before and after.",
    points: [
      "Code audit: about 25 issues documented and prioritized, API and admin access controls fixed.",
      "Migrated GitHub, Vercel and PostgreSQL / Neon to the agency’s own accounts with no downtime.",
      "Technical SEO: per-listing metadata, canonical and hreflang, structured data, server-rendered listings.",
      "Pull request and preview workflow, regression tests.",
    ],
    stack: "Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Prisma · PostgreSQL · Neon · Vercel · Apimo API · Mapbox",
    visit: "Visit the site",
  },
  path: {
    heading: "Experience",
    entries: [
      {
        period: "2026 —",
        role: "Full-stack developer (freelance)",
        company: "Delange Immobilier",
        place: "Paris",
        points: ["Took over, secured and evolved the agency’s application (see the case study)."],
      },
      {
        period: "2019 — 2024",
        role: "Full-stack JavaScript developer",
        company: "EdifiXio / Atos / Eviden",
        place: "Levallois-Perret · Bezons, France",
        missions: [
          {
            client: "JUNIA — Admissions",
            summary:
              "Independently built front-end and back-end features: a jury portal for application and interview assessments, and an agent portal for group registrations of international students.",
            stack: "React · TypeScript · Express · PostgreSQL · Salesforce API · Heroku",
          },
          {
            client: "JUNIA — Student fairs",
            summary: "Evolved a tablet application that collects prospective students’ program preferences.",
            stack: "Ionic · Angular · Express · TypeScript · PostgreSQL · Salesforce",
          },
          {
            client: "Internal staffing application",
            summary: "Independently delivered full-stack features, Jira and Salesforce API integrations and Salesforce authentication.",
            stack: "React · Express · MongoDB",
          },
          {
            client: "UDIFE",
            summary: "With a lead developer, an application centralizing business information for funeral services.",
            stack: "Next.js · MongoDB · IBM Cloud",
          },
          {
            client: "MACIF",
            summary: "Roadside-assistance request website (breakdown, towing), alongside the API and design teams.",
            stack: "Angular · REST APIs",
          },
          {
            client: "Jean Stalaven",
            summary: "Product recommendation algorithm for a catalog.",
            stack: "Node.js",
          },
          {
            client: "Touton",
            summary: "Application managing cocoa and coffee purchase and sales contracts.",
            stack: "Appian",
          },
        ],
      },
      {
        period: "2019",
        role: "Full-stack web developer (internship)",
        company: "Pop Eye",
        place: "Station F, Paris",
        points: [
          "Web version of the startup’s mobile product: React / Next.js interfaces, Node.js APIs, AWS file uploads, with the lead developer.",
        ],
      },
      {
        period: "2018 — 2019",
        role: "RNCP Level II certification, multimedia developer",
        company: "L’École Multimédia",
        place: "Paris",
        points: ["Distinction: jury honors."],
      },
    ],
  },
  projects: {
    heading: "Right now",
    items: [
      {
        title: "AI website generation SaaS",
        status: "Ongoing entrepreneurial project, with a Business Analyst",
        text: "An MVP that builds personalized business websites for small companies: Gemini-generated content, reusable templates, multi-site architecture.",
        stack: "Next.js · TypeScript · Prisma · PostgreSQL · Vercel · Gemini API",
      },
      {
        title: "AI-assisted development tooling",
        status: "Personal project, version-controlled setup",
        text: "My Claude Code environment under WSL, built with safeguards: the AI analyzes and proposes, I approve every decision and every sensitive action.",
        points: [
          "Security and technical SEO auditing agents.",
          "/pr-ready skill: typecheck, tests, review and checks before every pull request.",
          "Python hooks: block pushes to main, check translation consistency.",
          "Restrictive permissions and secret protection.",
        ],
        stack: "Claude Code · Python · MCP · Git",
      },
    ],
  },
  skills: {
    heading: "Skills",
    groups: [
      { label: "Front-end", items: "React, Next.js, TypeScript, JavaScript, Angular, Ionic, Tailwind CSS, CSS / SCSS" },
      { label: "Back-end & data", items: "Node.js, Express, REST APIs, PostgreSQL, MongoDB, Prisma" },
      { label: "Cloud & tools", items: "Git, Vercel, Neon, Heroku, IBM Cloud, AWS, Salesforce, Jira, Apimo, Appian, Agile" },
      { label: "AI", items: "Claude Code, agents, skills, hooks, ChatGPT, Gemini API" },
    ],
    languages: "French (native) · English (professional working proficiency)",
  },
  contact: {
    heading: "Let’s talk.",
    text: "A role, a contract, an application to take over: drop me a line, I reply quickly.",
    cvLabel: "Download my resume (PDF)",
    cvFile: null,
  },
  footer: {
    builtWith: "Designed and built with Next.js.",
    hosting: "Hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.",
  },
};
