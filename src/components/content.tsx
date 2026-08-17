import Link from "next/link";
import { Container } from "@/components/ui";
import { site } from "@/config/site";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="page-breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {index > 0 && <span aria-hidden="true">/</span>}

            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  breadcrumbLabel,
}: {
  eyebrow: string;
  title: string;
  text: string;
  breadcrumbLabel?: string;
}) {
  return (
    <section className="page-hero">
      <Container className="page-hero-container">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: breadcrumbLabel ?? eyebrow },
          ]}
        />

        <div className="page-hero-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </Container>
    </section>
  );
}

export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.domain,
      email: site.email,
      sameAs: [site.linkedin, site.github],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: site.name,
      description: site.description,
      url: site.domain,
      areaServed: "BR",
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}