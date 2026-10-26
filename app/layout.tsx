import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: "MedLink RCM", template: "%s | MedLink RCM" },
  description:
    "Revenue cycle management for hospitals, medical groups, dental networks and billing companies across the U.S.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable} ${instrument.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <ThemeToggle />
      </body>
    </html>
  );
}
