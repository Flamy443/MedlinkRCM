import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, Instrument_Serif } from "next/font/google";
import Preloader from "@/components/Preloader";
import BookingModal from "@/components/BookingModal";
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

// Runs before first paint: a browser reload on any inner page goes back to the home page.
const RELOAD_TO_HOME = `(function(){try{var n=performance.getEntriesByType("navigation")[0];var r=n?n.type==="reload":performance.navigation&&performance.navigation.type===1;if(r&&location.pathname!=="/"){location.replace("/")}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${figtree.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_HOME }} />
      </head>
      <body>
        <Preloader />
        <Header />
        {children}
        <Footer />
        <ThemeToggle />
        <BookingModal />
      </body>
    </html>
  );
}
