import type { ReactNode } from "react";
import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/lib/site";

// Set before the first paint so the entrance animation never flashes the final state.
const enableJs = "document.documentElement.classList.add('js')";

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: enableJs }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
