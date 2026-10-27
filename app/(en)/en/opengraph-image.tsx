import { ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = "Jérémy Geneste, full-stack developer, React, Next.js, Node.js";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
