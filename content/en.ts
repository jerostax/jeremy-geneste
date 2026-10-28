import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Jérémy Geneste, full-stack JavaScript and AI developer",
    description:
      "Jérémy Geneste, full-stack JavaScript developer since 2019, based in Paris, France. End-to-end web applications with React, Next.js and Node.js, with AI where it actually helps.",
    jobTitle: "Full-stack JavaScript and AI developer",
    ogTagline: "Full-stack JavaScript and AI developer",
  },
  sidebar: {
    role: "Full-stack JavaScript and AI developer",
    facts: ["Paris area, France", "Developer since 2019", "French, professional English"],
    nav: { parcours: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    navLabel: "Page sections",
    writeCta: "Email Jérémy",
    cv: "Resume (PDF)",
    cvFile: null,
    switchLanguage: "Lire en français",
    photoAlt: "Portrait of Jérémy Geneste",
  },
  lead: "I build web applications end to end, and bring in AI where it actually helps.",
  now: "Right now: freelancing for Delange Immobilier, and building an AI website generation SaaS. Open to a role or a contract, in French or in English.",
  numberLocale: "en-US",
  sections: {
    parcours: "Experience",
    projects: "Ongoing projects",
    skills: "Skills",
    contact: "Contact",
  },
  timeline: [
    {
      period: "2026",
      company: "Delange Immobilier",
      role: "Freelance full-stack developer, Paris",
      text: "Took over the agency’s live Next.js 15 / React 19 real-estate application. Code audit (about 25 prioritized issues), access security, migration to the agency’s own accounts with no downtime, SEO and performance.",
      figures: [
        { label: "Homepage weight", from: 21, to: 3.7, unit: "MB" },
        { label: "Mobile display time (LCP)", from: 88.7, to: 4, unit: "s" },
      ],
      stack: "Next.js, React, TypeScript, Prisma, PostgreSQL, Neon, Vercel, Apimo API.",
      link: { label: "Visit the site", href: "https://www.delangeimmobilier.com" },
    },
    {
      period: "2019–2024",
      company: "EdifiXio / Atos / Eviden",
      role: "Full-stack JavaScript developer, Levallois-Perret and Bezons, France",
      missions: [
        { name: "JUNIA, admissions.", text: "Jury and agent portals for international student registrations.", stack: "React, TypeScript, Express, PostgreSQL, Salesforce" },
        { name: "JUNIA, student fairs.", text: "Tablet app collecting prospective students’ program choices.", stack: "Ionic, Angular, Express" },
        { name: "Internal staffing.", text: "Full-stack features, Jira and Salesforce integrations.", stack: "React, Express, MongoDB" },
        { name: "UDIFE.", text: "Business application for funeral services, with a lead developer.", stack: "Next.js, MongoDB, IBM Cloud" },
        { name: "MACIF.", text: "Roadside-assistance request website.", stack: "Angular, REST APIs" },
        { name: "Jean Stalaven, Touton.", text: "Product recommendation algorithm; cocoa and coffee contract management.", stack: "Node.js, Appian" },
      ],
    },
    {
      period: "2019",
      company: "Pop Eye",
      role: "Internship, Station F, Paris",
      text: "Web version of the startup’s mobile product, with React, Next.js and Node.js, and AWS file uploads.",
    },
    {
      period: "2018–2019",
      company: "L’École Multimédia",
      role: "RNCP Level II certification, with jury honors",
    },
  ],
  projects: [
    {
      title: "AI website generation SaaS",
      context: "Entrepreneurial project, with a Business Analyst",
      text: "An MVP that builds personalized business websites for small companies: Gemini-generated content, reusable templates, multi-site architecture.",
      stack: "Next.js, TypeScript, Prisma, PostgreSQL, Vercel",
    },
    {
      title: "AI-assisted development",
      context: "Personal project",
      text: "My Claude Code setup: security and SEO auditing agents, automated checks before every pull request, safeguards on Git and secrets. The AI proposes, I approve.",
      stack: "Claude Code, Python, MCP",
    },
  ],
  skills: [
    { label: "Front-end", items: "React, Next.js, TypeScript, JavaScript, Angular, Ionic, Tailwind CSS" },
    { label: "Back-end and data", items: "Node.js, Express, REST APIs, PostgreSQL, MongoDB, Prisma" },
    { label: "Cloud and tools", items: "Git, Vercel, Neon, Heroku, IBM Cloud, AWS, Salesforce, Jira, Apimo, Appian" },
  ],
  contact: {
    heading: "A role, a contract, an application to take over? Drop me a line.",
    form: {
      name: "Name",
      email: "Email",
      company: "Company (optional)",
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      orDirectly: "or email me at",
      privacy: "Your details are only used to reply to you. They are not stored on this site or shared.",
      sentTitle: "Message sent.",
      sentText: "Thank you, I’ll get back to you shortly at the address you gave.",
      errors: {
        name: "Enter your name.",
        email: "Enter a valid email address.",
        message: "Write your message.",
        rateLimited: "Too many messages sent. Try again in an hour, or email me directly.",
        failed: "The message didn’t go through. Try again, or email me directly.",
      },
    },
  },
  footer: "Jérémy Geneste, 2026. Hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.",
};
