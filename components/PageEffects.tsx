"use client";

import { useEffect } from "react";

// Scroll-linked behaviors attached to server-rendered markup (data-* hooks),
// so the content stays in the HTML for search engines and without JavaScript.
export function PageEffects({ numberLocale }: { numberLocale: string }) {
  useEffect(() => {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")];
    const indicator = document.querySelector<HTMLElement>("[data-toc-indicator]");
    const sections = links.map((link) => document.querySelector<HTMLElement>(link.hash));
    const rail = document.querySelector<HTMLElement>("[data-rail]");
    const jobs = [...document.querySelectorAll<HTMLElement>("[data-job]")];

    function update() {
      const readingLine = innerHeight * 0.45;

      let active = -1;
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top < readingLine) active = i;
      });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) active = sections.length - 1;
      links.forEach((link, i) => link.toggleAttribute("data-active", i === active));
      if (indicator) {
        const link = links[active];
        indicator.style.opacity = link ? "1" : "0";
        if (link) {
          indicator.style.height = `${link.offsetHeight}px`;
          indicator.style.transform = `translateY(${link.offsetTop}px)`;
        }
      }

      if (rail) {
        const box = rail.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (readingLine - box.top) / box.height));
        rail.style.setProperty("--progress", String(progress));
      }
      jobs.forEach((job) => job.toggleAttribute("data-reached", job.getBoundingClientRect().top + 28 < readingLine));
    }

    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();

    const format = (value: number, unit: string) =>
      `${value.toLocaleString(numberLocale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ${unit}`;

    const figures = [...document.querySelectorAll<HTMLElement>("[data-figure]")];
    // The HTML holds the final values. Rewind them to the old ones until the figure is seen.
    if (!reduceMotion) {
      for (const figure of figures) {
        const value = figure.querySelector<HTMLElement>("[data-value]");
        if (value) value.textContent = format(Number(figure.dataset.from), figure.dataset.unit ?? "");
        figure.querySelector<HTMLElement>("[data-bar]")?.style.setProperty("width", "100%");
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const figure = entry.target as HTMLElement;
          const from = Number(figure.dataset.from);
          const to = Number(figure.dataset.to);
          const unit = figure.dataset.unit ?? "";
          const value = figure.querySelector<HTMLElement>("[data-value]");
          const bar = figure.querySelector<HTMLElement>("[data-bar]");
          if (!value || !bar) continue;
          bar.style.width = `${(to / from) * 100}%`;
          if (reduceMotion) {
            value.textContent = value.dataset.final ?? format(to, unit);
            continue;
          }
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / 1400);
            const eased = 1 - Math.pow(1 - t, 3);
            value.textContent = t < 1 ? format(from + (to - from) * eased, unit) : (value.dataset.final ?? format(to, unit));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 },
    );
    figures.forEach((figure) => observer.observe(figure));

    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [numberLocale]);

  return null;
}
