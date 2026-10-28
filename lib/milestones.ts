// Link from a step of the elevation profile to its anchor on the page. The page is
// rendered at build time, so an unknown target fails the build instead of shipping a dead link.
export function milestoneHref(target: string, anchors: readonly string[]): string {
  if (!anchors.includes(target)) throw new Error(`Unknown milestone target: "${target}"`);
  return `#${target}`;
}
