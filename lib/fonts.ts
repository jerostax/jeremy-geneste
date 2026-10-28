import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({
  weight: "variable",
  axes: ["opsz"],
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const text = Instrument_Sans({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const fontVariables = `${display.variable} ${text.variable}`;
