// Contact form rules, shared by the browser form and the API route.

export const limits = { name: 100, email: 200, company: 100, message: 5000 } as const;

export type ContactField = "name" | "email" | "message";

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string; // honeypot: hidden from people, filled by bots
};

export type ContactValidation =
  | { ok: true; data: Omit<ContactInput, "website"> }
  | { ok: false; fields: ContactField[] };

// Deliberately strict: no spaces, one "@", a dot in the domain, no "?" or other URL characters.
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export function isValidEmail(email: string): boolean {
  return email.length <= limits.email && emailPattern.test(email);
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactInput(body: unknown): ContactInput {
  const source = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  return {
    name: text(source.name),
    email: text(source.email),
    company: text(source.company),
    message: text(source.message),
    website: text(source.website),
  };
}

export function validateContact(input: ContactInput): ContactValidation {
  const fields: ContactField[] = [];
  if (!input.name || input.name.length > limits.name) fields.push("name");
  if (!isValidEmail(input.email)) fields.push("email");
  if (!input.message || input.message.length > limits.message) fields.push("message");
  if (fields.length > 0) return { ok: false, fields };
  return {
    ok: true,
    data: { name: input.name, email: input.email, company: input.company.slice(0, limits.company), message: input.message },
  };
}

export function isSpam(input: ContactInput): boolean {
  return input.website.length > 0;
}

// Plain-text email only: nothing the visitor types can become HTML or a header.
export function buildContactEmail(data: Omit<ContactInput, "website">) {
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");
  const subject = `Site perso : message de ${oneLine(data.name)}`.slice(0, 150);
  const lines = [
    `Nom : ${oneLine(data.name)}`,
    `E-mail : ${data.email}`,
    data.company ? `Entreprise : ${oneLine(data.company)}` : null,
    "",
    data.message,
  ].filter((line) => line !== null);
  return { subject, text: lines.join("\n"), replyTo: data.email };
}
