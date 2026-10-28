import type { Content } from "@/content/types";
import { buildProfile, chamonixToMontBlanc } from "@/lib/elevationProfile";
import { milestoneHref } from "@/lib/milestones";

const frame = { width: 800, height: 220, top: 40, bottom: 200, minElevation: 1000, maxElevation: 4900 };

// Server-rendered SVG: the full profile is in the HTML; PageEffects only replays the drawing.
// Each step links to its entry in the timeline (`anchors` lists the ids present on the page).
export function ElevationProfile({ copy, anchors }: { copy: Content["ascent"]; anchors: readonly string[] }) {
  const profile = buildProfile(chamonixToMontBlanc, frame);
  const pins = copy.milestones.map((milestone, i) => ({
    ...milestone,
    href: milestoneHref(milestone.target, anchors),
    row: i % 2,
    ...profile.pointAt(milestone.at),
  }));
  const start = profile.pointAt(0);
  return (
    <figure className="mt-5.5" aria-label={copy.label}>
      <p className="mb-3 text-[14px] text-soft">{copy.caption}</p>
      <svg data-ascent viewBox={`0 0 ${frame.width} ${frame.height}`} className="block h-auto w-full overflow-visible text-accent">
        <defs>
          <linearGradient id="ascent-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={profile.area} fill="url(#ascent-fill)" />
        <path d={profile.line} fill="none" className="stroke-line" strokeWidth="2" />
        <path data-ascent-line d={profile.line} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        {pins.map((pin) => {
          const labelY = pin.row ? 26 : 10;
          const anchor = pin.at > 0.95 ? "end" : pin.at < 0.05 ? "start" : "middle";
          return (
            <g key={pin.label} data-ascent-pin={pin.at}>
              <line x1={pin.x} y1={pin.y - 8} x2={pin.x} y2={labelY + 6} className="stroke-muted" strokeWidth="1" strokeDasharray="2 3" />
              {/* Labels are too small once the drawing shrinks on phones: the links below replace them. */}
              <a href={pin.href} className="ascent-link hidden sm:inline">
                {/* Invisible hit area along the dashed line, so the pin is clickable too. */}
                <rect x={pin.x - 9} y={labelY + 2} width="18" height={pin.y - labelY + 6} fill="transparent" />
                <text x={pin.x} y={labelY} textAnchor={anchor} className="ascent-label fill-muted text-[12px]">
                  {pin.label}
                </text>
              </a>
              <circle cx={pin.x} cy={pin.y} r="5" className="ascent-pin fill-ink stroke-muted" strokeWidth="2" />
            </g>
          );
        })}
        <circle data-ascent-climber cx={start.x} cy={start.y} r="4" fill="currentColor" className="opacity-0" />
      </svg>
      <figcaption className="mt-1.5 flex justify-between gap-3 text-[13px] text-muted">
        <span>{copy.start}</span>
        <span>{copy.end}</span>
      </figcaption>
      <ol className="mt-4 flex flex-wrap gap-2 sm:hidden">
        {pins.map((pin) => (
          <li key={pin.label}>
            <a href={pin.href}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-[14px] transition-colors ${
                pin.target === "contact"
                  ? "border-accent/50 bg-accent/10 text-paper hover:bg-accent/20"
                  : "border-line bg-panel text-soft hover:border-accent/50 hover:text-paper"
              }`}>
              {pin.label}
              <span aria-hidden className="text-accent">↓</span>
            </a>
          </li>
        ))}
      </ol>
    </figure>
  );
}
