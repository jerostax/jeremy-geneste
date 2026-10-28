import { ogSize, renderOgImage } from "@/lib/ogImage";

export const alt = "Jérémy Geneste, développeur fullstack JavaScript et IA";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("fr");
}
