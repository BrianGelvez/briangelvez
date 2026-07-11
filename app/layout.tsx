import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { PERSONAL_INFO } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Brian Gelvez | Full Stack Developer — Córdoba, Argentina",
    template: "%s | Brian Gelvez",
  },
  description:
    "Full Stack Developer especializado en Next.js, TypeScript y Node.js. Ex soldado del Ejército Argentino reconvertido en desarrollador, con productos en producción y foco en software que funciona.",
  keywords: [
    "Brian Gelvez",
    "full stack developer",
    "next.js",
    "typescript",
    "react",
    "córdoba argentina",
    "portfolio developer",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: SITE_URL }],
  creator: PERSONAL_INFO.name,
  publisher: PERSONAL_INFO.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: `${PERSONAL_INFO.name} — Portfolio`,
    title: "Brian Gelvez | Full Stack Developer",
    description:
      "Soldado por formación. Developer por decisión. Portfolio de Brian Gelvez, desarrollador full stack con experiencia real en productos en producción.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Brian Gelvez — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Gelvez | Full Stack Developer",
    description:
      "Portfolio profesional de Brian Gelvez, full stack developer de Córdoba, Argentina.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className="min-h-full bg-background text-foreground"
        suppressHydrationWarning
      >
        <LenisProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
