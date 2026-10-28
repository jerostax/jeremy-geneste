export type Figure = {
  label: string;
  from: number;
  to: number;
  unit: string;
};

export type Mission = {
  name: string;
  text: string;
  stack: string;
};

export type TimelineEntry = {
  period: string;
  company: string;
  role: string;
  text?: string;
  figures?: Figure[];
  missions?: Mission[];
  stack?: string;
  link?: { label: string; href: string };
};

export type Project = {
  title: string;
  context: string;
  text: string;
  stack: string;
};

export type SkillGroup = {
  label: string;
  items: string;
};

export type FormCopy = {
  name: string;
  email: string;
  company: string;
  message: string;
  submit: string;
  sending: string;
  orDirectly: string;
  privacy: string;
  sentTitle: string;
  sentText: string;
  errors: {
    name: string;
    email: string;
    message: string;
    rateLimited: string;
    failed: string;
  };
};

export type Content = {
  meta: {
    title: string;
    description: string;
    jobTitle: string;
    ogTagline: string;
  };
  sidebar: {
    role: string;
    facts: string[];
    nav: { parcours: string; projects: string; skills: string; contact: string };
    navLabel: string;
    writeCta: string;
    cv: string;
    cvFile: string | null;
    switchLanguage: string;
    photoAlt: string;
  };
  lead: string;
  now: string;
  numberLocale: string;
  sections: {
    parcours: string;
    projects: string;
    skills: string;
    contact: string;
  };
  timeline: TimelineEntry[];
  projects: Project[];
  skills: SkillGroup[];
  contact: {
    heading: string;
    form: FormCopy;
  };
  footer: string;
};
