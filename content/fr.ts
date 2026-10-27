import type { Content } from "./types";

export const fr: Content = {
  meta: {
    title: "Jérémy Geneste — Développeur fullstack React, Next.js, Node.js",
    description:
      "Jérémy Geneste, développeur fullstack JavaScript depuis 2019 en Île-de-France : React, Next.js, TypeScript et Node.js. Applications web métier, API, intégrations, SEO technique et performance.",
    jobTitle: "Développeur fullstack JavaScript",
    ogTagline: "Développeur fullstack · React · Next.js · Node.js",
  },
  nav: {
    work: "Étude de cas",
    path: "Parcours",
    projects: "Projets",
    contact: "Contact",
    switchLanguage: "EN",
    switchLanguageLabel: "Read in English",
  },
  hero: {
    kicker: "Développeur fullstack · Île-de-France · depuis 2019",
    intro:
      "Je conçois, reprends et fais évoluer des applications web métier, de l’interface jusqu’à la base de données : React, Next.js, TypeScript et Node.js, avec les intégrations qui vont autour (Salesforce, Jira, API tierces).",
    availability: "Ouvert aux opportunités, en français comme en anglais.",
    emailCta: "M’écrire",
    photoAlt: "Portrait de Jérémy Geneste, développeur fullstack",
    photoCaption: "Jérémy Geneste, Paris",
  },
  caseStudy: {
    heading: "Étude de cas",
    client: "Delange Immobilier",
    role: "Développeur fullstack freelance · depuis octobre 2026 · seul interlocuteur technique",
    intro:
      "Reprise d’une application immobilière Next.js 15 / React 19 en production : audit, sécurité, migration d’infrastructure, SEO et performance.",
    metrics: [
      { before: "21 Mo", after: "3,7 Mo", label: "poids de la page d’accueil" },
      { before: "88,7 s", after: "4,0 s", label: "affichage du contenu principal (LCP mobile)" },
    ],
    metricsSource: "Mesures PageSpeed Insights, avant et après.",
    points: [
      "Audit du code : environ 25 problèmes documentés et priorisés, accès API et administration corrigés.",
      "Migration de GitHub, Vercel et PostgreSQL / Neon vers les comptes de l’agence, sans interruption de service.",
      "SEO technique : métadonnées propres à chaque annonce, canonical et hreflang, données structurées, annonces rendues côté serveur.",
      "Workflow par pull requests et previews, tests de non-régression.",
    ],
    stack: "Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Prisma · PostgreSQL · Neon · Vercel · API Apimo · Mapbox",
    visit: "Voir le site",
  },
  path: {
    heading: "Parcours",
    entries: [
      {
        period: "2026 —",
        role: "Développeur fullstack (freelance)",
        company: "Delange Immobilier",
        place: "Paris",
        points: ["Reprise, sécurisation et évolution de l’application de l’agence (voir l’étude de cas)."],
      },
      {
        period: "2019 — 2024",
        role: "Développeur fullstack JavaScript",
        company: "EdifiXio / Atos / Eviden",
        place: "Levallois-Perret · Bezons",
        missions: [
          {
            client: "JUNIA — Admissions",
            summary:
              "Fonctionnalités front et back en autonomie : un espace Jury (évaluation des dossiers et entretiens) et un espace Agent (inscriptions groupées d’étudiants internationaux).",
            stack: "React · TypeScript · Express · PostgreSQL · API Salesforce · Heroku",
          },
          {
            client: "JUNIA — Salons étudiants",
            summary: "Évolution d’une application tablette qui recueille les choix de formation des visiteurs.",
            stack: "Ionic · Angular · Express · TypeScript · PostgreSQL · Salesforce",
          },
          {
            client: "Application interne de staffing",
            summary: "Développement fullstack en autonomie, intégration des API Jira et Salesforce et de l’authentification Salesforce.",
            stack: "React · Express · MongoDB",
          },
          {
            client: "UDIFE",
            summary: "Avec un lead développeur, application qui centralise les informations métier de l’accompagnement funéraire.",
            stack: "Next.js · MongoDB · IBM Cloud",
          },
          {
            client: "MACIF",
            summary: "Site de demande d’assistance automobile (dépannage, remorquage), avec les équipes API et design.",
            stack: "Angular · API REST",
          },
          {
            client: "Jean Stalaven",
            summary: "Algorithme de recommandation de produits d’un catalogue.",
            stack: "Node.js",
          },
          {
            client: "Touton",
            summary: "Application de gestion des contrats d’achat et de vente de cacao et de café.",
            stack: "Appian",
          },
        ],
      },
      {
        period: "2019",
        role: "Développeur web fullstack (stage)",
        company: "Pop Eye",
        place: "Station F, Paris",
        points: [
          "Version web du produit mobile de la startup : interfaces React / Next.js, API Node.js, envoi de fichiers sur AWS, avec le lead développeur.",
        ],
      },
      {
        period: "2018 — 2019",
        role: "Certification RNCP niveau II, développeur multimédia",
        company: "L’École Multimédia",
        place: "Paris",
        points: ["Mention : excellence du jury."],
      },
    ],
  },
  projects: {
    heading: "En ce moment",
    items: [
      {
        title: "SaaS de génération de sites web par IA",
        status: "Projet entrepreneurial en cours, avec un Business Analyst",
        text: "Un MVP qui crée des sites professionnels personnalisés pour les petites entreprises : contenus générés par Gemini, templates réutilisables, architecture multi-sites.",
        stack: "Next.js · TypeScript · Prisma · PostgreSQL · Vercel · API Gemini",
      },
      {
        title: "Outillage de développement assisté par IA",
        status: "Projet personnel, configuration versionnée",
        text: "Mon environnement Claude Code sous WSL, avec des garde-fous : l’IA analyse et propose, je valide chaque décision et chaque action sensible.",
        points: [
          "Agents d’audit de sécurité et de SEO technique.",
          "Skill /pr-ready : typecheck, tests, relecture et contrôle avant chaque pull request.",
          "Hooks Python : blocage des push sur main, vérification des traductions.",
          "Permissions restrictives et protection des secrets.",
        ],
        stack: "Claude Code · Python · MCP · Git",
      },
    ],
  },
  skills: {
    heading: "Compétences",
    groups: [
      { label: "Front-end", items: "React, Next.js, TypeScript, JavaScript, Angular, Ionic, Tailwind CSS, CSS / SCSS" },
      { label: "Back-end & données", items: "Node.js, Express, API REST, PostgreSQL, MongoDB, Prisma" },
      { label: "Cloud & outils", items: "Git, Vercel, Neon, Heroku, IBM Cloud, AWS, Salesforce, Jira, Apimo, Appian, Agile" },
      { label: "IA", items: "Claude Code, agents, skills, hooks, ChatGPT, API Gemini" },
    ],
    languages: "Français (langue maternelle) · anglais (professionnel)",
  },
  contact: {
    heading: "Parlons-en.",
    text: "Un poste, une mission, une application à reprendre : écrivez-moi, je réponds rapidement.",
    cvLabel: "Télécharger le CV (PDF)",
    cvFile: null,
  },
  footer: {
    builtWith: "Conçu et développé avec Next.js.",
    hosting: "Hébergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.",
  },
};
