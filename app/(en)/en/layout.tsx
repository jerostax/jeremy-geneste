import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/RootShell";
import { content } from "@/content";
import { buildMetadata } from "@/lib/seo";
import "../../globals.css";

export const metadata: Metadata = buildMetadata("en", content.en);

export const viewport: Viewport = { themeColor: "#0d0c0a", colorScheme: "dark" };

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
