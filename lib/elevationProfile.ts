// Real elevation profile along a straight line from Chamonix (45.9237, 6.8694)
// to the Mont Blanc summit (45.8326, 6.8652): 100 SRTM 30 m samples from the
// public OpenTopoData API (28/10/2026). SRTM smooths summits: 4 791 m here,
// 4 806 m officially, which is the figure shown to visitors.
export const chamonixToMontBlanc: readonly number[] = [
  1044, 1042, 1040, 1034, 1036, 1039, 1037, 1033, 1034, 1040, 1069, 1114, 1158, 1200, 1262, 1316, 1389, 1452, 1488, 1518,
  1518, 1516, 1526, 1542, 1543, 1575, 1620, 1642, 1666, 1724, 1770, 1815, 1869, 1950, 1931, 1939, 1989, 2047, 2032, 2097,
  2194, 2252, 2300, 2346, 2402, 2448, 2479, 2504, 2529, 2552, 2563, 2585, 2611, 2632, 2676, 2747, 2807, 2851, 2880, 2908,
  2932, 2956, 2992, 3030, 3061, 3102, 3135, 3156, 3169, 3189, 3207, 3254, 3286, 3302, 3341, 3391, 3447, 3506, 3614, 3678,
  3860, 3884, 3928, 3940, 3981, 4049, 4107, 4125, 4160, 4228, 4305, 4345, 4370, 4479, 4511, 4546, 4610, 4664, 4761, 4791,
];

export type ProfileFrame = { width: number; height: number; top: number; bottom: number; minElevation: number; maxElevation: number };

export type ProfileGeometry = {
  line: string;
  area: string;
  pointAt: (fraction: number) => { x: number; y: number; elevation: number };
};

// Pure geometry: SVG paths for the profile and the position of any fraction of the route.
export function buildProfile(elevations: readonly number[], frame: ProfileFrame): ProfileGeometry {
  const last = elevations.length - 1;
  const x = (i: number) => (i / last) * frame.width;
  const y = (e: number) =>
    frame.bottom - ((e - frame.minElevation) / (frame.maxElevation - frame.minElevation)) * (frame.bottom - frame.top);
  const line = elevations.map((e, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(e).toFixed(1)}`).join(" ");
  const area = `${line} L${frame.width} ${frame.height} L0 ${frame.height} Z`;
  const pointAt = (fraction: number) => {
    const i = Math.round(Math.min(1, Math.max(0, fraction)) * last);
    return { x: x(i), y: y(elevations[i]), elevation: elevations[i] };
  };
  return { line, area, pointAt };
}
