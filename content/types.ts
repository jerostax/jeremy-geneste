export type Metric = {
  before: string;
  after: string;
  label: string;
};

export type Mission = {
  client: string;
  summary: string;
  stack: string;
};

export type TimelineEntry = {
  period: string;
  role: string;
  company: string;
  place: string;
  points?: string[];
  missions?: Mission[];
};

export type Project = {
  title: string;
  status: string;
  text: string;
  points?: string[];
  stack: string;
};

export type SkillGroup = {
  label: string;
  items: string;
};

export type Content = {
  meta: {
    title: string;
    description: string;
    jobTitle: string;
    ogTagline: string;
  };
  nav: {
    work: string;
    path: string;
    projects: string;
    contact: string;
    switchLanguage: string;
    switchLanguageLabel: string;
  };
  hero: {
    kicker: string;
    intro: string;
    availability: string;
    emailCta: string;
    photoAlt: string;
    photoCaption: string;
  };
  caseStudy: {
    heading: string;
    client: string;
    role: string;
    intro: string;
    metrics: Metric[];
    metricsSource: string;
    points: string[];
    stack: string;
    visit: string;
  };
  path: {
    heading: string;
    entries: TimelineEntry[];
  };
  projects: {
    heading: string;
    items: Project[];
  };
  skills: {
    heading: string;
    groups: SkillGroup[];
    languages: string;
  };
  contact: {
    heading: string;
    text: string;
    cvLabel: string;
    cvFile: string | null;
  };
  footer: {
    builtWith: string;
    hosting: string;
  };
};
