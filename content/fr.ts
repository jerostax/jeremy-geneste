import type { Content } from "./types";

export const fr: Content = {
  meta: {
    title: "Jérémy Geneste, développeur fullstack JavaScript et IA",
    description:
      "Jérémy Geneste, développeur fullstack JavaScript depuis 2019 en Île-de-France. Applications web de bout en bout en React, Next.js et Node.js, avec l’IA là où elle sert vraiment.",
    jobTitle: "Développeur fullstack JavaScript et IA",
    ogTagline: "Développeur fullstack JavaScript et IA",
  },
  sidebar: {
    role: "Développeur fullstack JavaScript et IA",
    facts: ["Île-de-France", "Développeur depuis 2019", "Français, anglais professionnel"],
    nav: { parcours: "Parcours", projects: "Projets", skills: "Compétences", contact: "Contact" },
    navLabel: "Sections de la page",
    writeCta: "Écrire à Jérémy",
    cv: "CV en PDF",
    cvFile: null,
    switchLanguage: "Read in English",
    photoAlt: "Portrait de Jérémy Geneste",
  },
  lead: "Je conçois des applications web de bout en bout, et j’y intègre l’IA là où elle sert vraiment.",
  now: "En ce moment : freelance pour Delange Immobilier, et un SaaS de création de sites par IA. Ouvert à un poste ou une mission, en français ou en anglais.",
  numberLocale: "fr-FR",
  sections: {
    parcours: "Parcours",
    projects: "Projets en cours",
    skills: "Compétences",
    contact: "Contact",
  },
  timeline: [
    {
      period: "2026",
      company: "Delange Immobilier",
      role: "Développeur fullstack freelance, Paris",
      text: "Reprise de l’application immobilière Next.js 15 / React 19 de l’agence, en production. Audit du code (environ 25 problèmes priorisés), sécurité des accès, migration vers les comptes de l’agence sans coupure, référencement et performance.",
      figures: [
        { label: "Poids de la page d’accueil", from: 21, to: 3.7, unit: "Mo" },
        { label: "Affichage sur mobile (LCP)", from: 88.7, to: 4, unit: "s" },
      ],
      stack: "Next.js, React, TypeScript, Prisma, PostgreSQL, Neon, Vercel, API Apimo.",
      link: { label: "Voir le site", href: "https://www.delangeimmobilier.com" },
    },
    {
      period: "2019–2024",
      company: "EdifiXio / Atos / Eviden",
      role: "Développeur fullstack JavaScript, Levallois-Perret et Bezons",
      missions: [
        { name: "JUNIA, admissions.", text: "Espace Jury et espace Agent pour les inscriptions d’étudiants internationaux.", stack: "React, TypeScript, Express, PostgreSQL, Salesforce" },
        { name: "JUNIA, salons étudiants.", text: "Application tablette de recueil des choix de formation.", stack: "Ionic, Angular, Express" },
        { name: "Staffing interne.", text: "Fullstack, intégrations Jira et Salesforce.", stack: "React, Express, MongoDB" },
        { name: "UDIFE.", text: "Application métier de l’accompagnement funéraire, avec un lead développeur.", stack: "Next.js, MongoDB, IBM Cloud" },
        { name: "MACIF.", text: "Site de demande d’assistance automobile.", stack: "Angular, API REST" },
        { name: "Jean Stalaven, Touton.", text: "Algorithme de recommandation ; gestion de contrats de cacao et de café.", stack: "Node.js, Appian" },
      ],
    },
    {
      period: "2019",
      company: "Pop Eye",
      role: "Stage, Station F",
      text: "Version web du produit mobile de la startup, en React, Next.js et Node.js, avec envoi de fichiers sur AWS.",
    },
    {
      period: "2018–2019",
      company: "L’École Multimédia",
      role: "Certification RNCP niveau II, mention excellence du jury",
    },
  ],
  projects: [
    {
      title: "SaaS de création de sites par IA",
      context: "Projet entrepreneurial, avec un Business Analyst",
      text: "Un MVP qui crée des sites professionnels personnalisés pour les petites entreprises : contenus générés par Gemini, templates réutilisables, architecture multi-sites.",
      stack: "Next.js, TypeScript, Prisma, PostgreSQL, Vercel",
    },
    {
      title: "Développement assisté par IA",
      context: "Projet personnel",
      text: "Mon environnement Claude Code : agents d’audit de sécurité et de référencement, contrôles automatiques avant chaque pull request, garde-fous sur Git et sur les secrets. L’IA propose, je valide.",
      stack: "Claude Code, Python, MCP",
    },
  ],
  skills: [
    { label: "Front-end", items: "React, Next.js, TypeScript, JavaScript, Angular, Ionic, Tailwind CSS" },
    { label: "Back-end et données", items: "Node.js, Express, API REST, PostgreSQL, MongoDB, Prisma" },
    { label: "Cloud et outils", items: "Git, Vercel, Neon, Heroku, IBM Cloud, AWS, Salesforce, Jira, Apimo, Appian" },
  ],
  contact: {
    heading: "Un poste, une mission, une application à reprendre ? Écrivez-moi.",
    form: {
      name: "Nom",
      email: "E-mail",
      company: "Entreprise (facultatif)",
      message: "Message",
      submit: "Envoyer le message",
      sending: "Envoi…",
      orDirectly: "ou directement à",
      privacy: "Vos informations servent uniquement à vous répondre. Elles ne sont ni conservées sur ce site, ni partagées.",
      sentTitle: "Message envoyé.",
      sentText: "Merci, je vous réponds rapidement à l’adresse indiquée.",
      errors: {
        name: "Indiquez votre nom.",
        email: "Indiquez une adresse e-mail valide.",
        message: "Écrivez votre message.",
        rateLimited: "Trop de messages envoyés. Réessayez dans une heure, ou écrivez-moi directement.",
        failed: "Le message n’est pas parti. Réessayez, ou écrivez-moi directement.",
      },
    },
  },
  footer: "Jérémy Geneste, 2026. Hébergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.",
};
