"use client";

import { useState, type FormEvent } from "react";
import type { FormCopy } from "@/content/types";
import { isValidEmail, limits, type ContactField } from "@/lib/contact";

type Status = "idle" | "sending" | "sent";

const inputClass =
  "rounded-lg border border-line bg-panel px-3 py-2.5 text-base text-paper transition-colors focus:border-accent focus:bg-panel-strong focus:outline-none aria-[invalid=true]:border-danger";

export function ContactForm({ copy, email }: { copy: FormCopy; email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<ContactField[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const fields: ContactField[] = [];
    if (!data.name?.trim()) fields.push("name");
    if (!isValidEmail(data.email?.trim() ?? "")) fields.push("email");
    if (!data.message?.trim()) fields.push("message");
    setInvalid(fields);
    setError(null);
    if (fields.length > 0) {
      form.querySelector<HTMLElement>(`[name="${fields[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("sent");
        return;
      }
      const body = (await response.json().catch(() => ({}))) as { fields?: ContactField[] };
      if (response.status === 400 && body.fields?.length) setInvalid(body.fields);
      else setError(response.status === 429 ? copy.errors.rateLimited : copy.errors.failed);
    } catch {
      setError(copy.errors.failed);
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div role="status" className="sent-message mt-6 max-w-2xl rounded-xl bg-panel p-6">
        <p className="text-lg font-semibold">{copy.sentTitle}</p>
        <p className="mt-1.5 text-soft">{copy.sentText}</p>
      </div>
    );
  }

  const fieldError = (field: ContactField) =>
    invalid.includes(field) ? (
      <span id={`${field}-error`} className="text-[13px] text-danger">
        {copy.errors[field]}
      </span>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 grid max-w-2xl gap-3.5 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5 text-sm text-muted">
        {copy.name}
        <input name="name" autoComplete="name" maxLength={limits.name} className={inputClass}
          aria-invalid={invalid.includes("name")} aria-describedby={invalid.includes("name") ? "name-error" : undefined} />
        {fieldError("name")}
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-muted">
        {copy.email}
        <input name="email" type="email" autoComplete="email" maxLength={limits.email} className={inputClass}
          aria-invalid={invalid.includes("email")} aria-describedby={invalid.includes("email") ? "email-error" : undefined} />
        {fieldError("email")}
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-muted sm:col-span-2">
        {copy.company}
        <input name="company" autoComplete="organization" maxLength={limits.company} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-muted sm:col-span-2">
        {copy.message}
        <textarea name="message" rows={6} maxLength={limits.message} className={`${inputClass} resize-y`}
          aria-invalid={invalid.includes("message")} aria-describedby={invalid.includes("message") ? "message-error" : undefined} />
        {fieldError("message")}
      </label>
      {/* Honeypot: hidden from people, filled by bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "sending"}
          className="cursor-pointer rounded-lg bg-accent px-5.5 py-3 font-semibold text-ink transition hover:-translate-y-0.5 disabled:cursor-progress disabled:opacity-60 disabled:hover:translate-y-0">
          {status === "sending" ? copy.sending : copy.submit}
        </button>
        <span className="text-sm text-muted">
          {copy.orDirectly}{" "}
          <a href={`mailto:${email}`} className="text-paper underline underline-offset-2">{email}</a>
        </span>
      </div>
      {error && <p role="alert" className="text-sm text-danger sm:col-span-2">{error}</p>}
      <p className="text-[13px] text-muted sm:col-span-2">{copy.privacy}</p>
    </form>
  );
}
