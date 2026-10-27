import { ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = "Jérémy Geneste, développeur fullstack React, Next.js, Node.js";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("fr");
}
