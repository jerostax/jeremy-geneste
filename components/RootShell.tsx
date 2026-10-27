import type { ReactNode } from "react";
import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/lib/site";

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${fontVariables} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
