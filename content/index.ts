import type { Locale } from "@/lib/site";
import { en } from "./en";
import { fr } from "./fr";
import type { Content } from "./types";

export const content: Record<Locale, Content> = { fr, en };
