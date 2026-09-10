import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { site } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — авто из Китая и Кореи под ключ`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};

/** Template component (§1) — Nav and Footer wrap every page. */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans antialiased">
        <Nav />
        <main className="flex flex-col gap-24 tablet:gap-32 desktop:gap-36">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
