import type { Metadata } from "next";
import { Container, ProductCard, CTA } from "@/components/ui";
import { PageHero } from "@/components/content";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Produtos", description: "Catálogo de produtos digitais da DIRECT TI, com stack, status e acesso a cada solução." };

export default function Produtos() {
  const productStructuredData = site.products.map((product) => ({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: product.name, description: product.description, url: product.href, applicationCategory: "BusinessApplication", operatingSystem: "Web", author: { "@type": "Organization", name: site.name, url: site.domain } }));
  return <><PageHero eyebrow="Produtos" title="Produtos digitais construídos para operar" text="Conheça as soluções da DIRECT TI, suas tecnologias, estágio atual e o caminho para acessar cada produto." /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }} /><section className="internal-section product-catalog-section py-16 sm:py-20"><Container><div className="product-catalog-intro mb-10 max-w-2xl"><p className="eyebrow">Portfólio de soluções</p><p className="mt-3 text-lg leading-8 text-slate-600">Cada produto nasce de uma necessidade concreta: organizar processos, dar visibilidade aos dados ou criar uma experiência digital mais eficiente.</p></div><div className="product-catalog-grid grid gap-6">{site.products.map((product) => <ProductCard product={product} key={product.name} />)}</div></Container></section><CTA /></>;
}
