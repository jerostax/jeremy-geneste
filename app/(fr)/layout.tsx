import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/RootShell";
import { content } from "@/content";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = buildMetadata("fr", content.fr);

export const viewport: Viewport = { themeColor: "#0b1220", colorScheme: "dark" };

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="fr">{children}</RootShell>;
}
