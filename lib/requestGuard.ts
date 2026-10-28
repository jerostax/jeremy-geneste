export const maxBodyBytes = 20_000;

export type RequestShape = {
  origin: string | null;
  host: string | null;
  contentType: string | null;
  contentLength: string | null;
};

export type GuardError = "cross_origin" | "unsupported_media_type" | "too_large";

// Rejects posts from other sites, non-JSON bodies and oversized payloads before any work.
export function checkRequestShape(shape: RequestShape): GuardError | null {
  if (!shape.origin || !shape.host) return "cross_origin";
  let originHost: string;
  try {
    originHost = new URL(shape.origin).host;
  } catch {
    return "cross_origin";
  }
  if (originHost !== shape.host) return "cross_origin";
  if (!shape.contentType?.toLowerCase().startsWith("application/json")) return "unsupported_media_type";
  if (shape.contentLength && Number(shape.contentLength) > maxBodyBytes) return "too_large";
  return null;
}

export const guardStatus: Record<GuardError, number> = {
  cross_origin: 403,
  unsupported_media_type: 415,
  too_large: 413,
};
