import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

import { Footer, Header } from "@/components/site-chrome";
import { StructuredData } from "@/components/content";
import { site } from "@/config/site";
import { Suspense } from "react";

import { AttributionTracker } from "@/components/attribution-tracker";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),

  title: {
    default:
      "DIRECT TI | Tecnologia para sistemas que não podem parar",
    template: "%s | DIRECT TI",
  },

  description: site.description,

  keywords: [
    "modernização de sistemas legados",
    "migração ASP Classic",
    "consultoria .NET",
    "desenvolvimento de sistemas sob medida",
    "sustentação de sistemas",
    "integração de APIs",
    "Power BI e Oracle",
    "consultoria SQL Server",
    "desenvolvimento SaaS",
    "automação com IA",
  ],

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="pt-BR">
      <body>
        <StructuredData />

        <Suspense fallback={null}>
        <AttributionTracker />
        </Suspense>

        <Header />

        <main>{children}</main>

        <Footer />
      </body>

      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}