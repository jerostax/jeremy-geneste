import type { Content } from "@/content/types";
import { buildProfile, chamonixToMontBlanc } from "@/lib/elevationProfile";

const frame = { width: 800, height: 220, top: 40, bottom: 200, minElevation: 1000, maxElevation: 4900 };

// Server-rendered SVG: the full profile is in the HTML; PageEffects only replays the drawing.
export function ElevationProfile({ copy }: { copy: Content["ascent"] }) {
  const profile = buildProfile(chamonixToMontBlanc, frame);
  const pins = copy.milestones.map((milestone, i) => ({ ...milestone, row: i % 2, ...profile.pointAt(milestone.at) }));
  const start = profile.pointAt(0);

  return (
    <figure className="mt-5.5" aria-label={copy.label}>
      <svg data-ascent viewBox={`0 0 ${frame.width} ${frame.height}`} className="block h-auto w-full overflow-visible text-accent" role="img" aria-label={copy.label}>
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
              {/* Labels are too small once the drawing shrinks on phones: the list below replaces them. */}
              <text x={pin.x} y={labelY} textAnchor={anchor} className="ascent-label hidden fill-muted text-[12px] sm:block">
                {pin.label}
              </text>
              <circle cx={pin.x} cy={pin.y} r="5" className="ascent-pin fill-ink stroke-muted" strokeWidth="2" />
            </g>
          );
        })}
        <circle data-ascent-climber cx={start.x} cy={start.y} r="4" fill="currentColor" className="opacity-0" />
      </svg>
      <figcaption className="mt-1.5 flex justify-between gap-3 text-[13px] text-muted">
        <span>{copy.start}</span>
        <span className="hidden text-center sm:inline">{copy.source}</span>
        <span>{copy.end}</span>
      </figcaption>
      <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-soft sm:hidden">
        {copy.milestones.map((milestone) => <li key={milestone.label}>{milestone.label}</li>)}
      </ol>
    </figure>
  );
}
