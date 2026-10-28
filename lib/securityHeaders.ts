// Static site: everything is served from this origin (fonts and images included),
// so the policy can stay strict. Inline scripts are allowed because Next.js bootstraps
// the page with inline scripts; a nonce would make every page dynamic.
export function buildContentSecurityPolicy(isDevelopment: boolean): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    // React needs eval only in development (stack traces, fast refresh).
    "script-src": ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'", ...(isDevelopment ? ["'unsafe-eval'"] : [])],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...(isDevelopment ? ["ws:"] : [])],
    "worker-src": ["'self'", "blob:"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
  };
  const policy = Object.entries(directives).map(([name, values]) => `${name} ${values.join(" ")}`);
  if (!isDevelopment) policy.push("upgrade-insecure-requests");
  return policy.join("; ");
}

export function buildSecurityHeaders(isDevelopment: boolean) {
  return [
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy(isDevelopment) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
}
