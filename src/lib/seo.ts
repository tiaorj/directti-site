import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMetadata(title: string, description: string): Metadata {
  return { title, description, alternates: { canonical: "/" }, openGraph: { title: `${title} | ${site.name}`, description, url: "/", locale: "pt_BR", type: "website", siteName: site.name }, twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description } };
}
