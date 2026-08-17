import Image from "next/image";

import { site } from "@/config/site";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/tracked-link";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`section-heading max-w-3xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}

      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {text && (
        <p className="mt-4 text-lg leading-8">
          {text}
        </p>
      )}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  const className = secondary
    ? "btn btn-secondary"
    : "btn btn-primary";

  const isExternal = /^https?:\/\//.test(href);
  const isWhatsApp = href.includes("wa.me");

  if (isExternal) {
    return (
      <TrackedAnchor
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        eventName={
          isWhatsApp
            ? "whatsapp_click"
            : "cta_click"
        }
        eventParams={{
          ui_location: "button_link",
          target_type: isWhatsApp
            ? "whatsapp"
            : "external",
        }}
      >
        {children}
        <span aria-hidden="true">→</span>
      </TrackedAnchor>
    );
  }

  return (
    <TrackedLink
      className={className}
      href={href}
      eventName="cta_click"
      eventParams={{
        ui_location: "button_link",
        target_path: href,
      }}
    >
      {children}
      <span aria-hidden="true">→</span>
    </TrackedLink>
  );
}

export function ServiceCard({
  title,
  text,
  benefits,
  href,
  icon,
}: {
  title: string;
  text: string;
  benefits: readonly string[];
  href: string;
  icon: string;
}) {
  return (
    <article className="service-card">
      <div
        className="service-card-icon"
        aria-hidden="true"
      >
        {icon}
      </div>

      <p className="service-card-label">
        Especialidade DIRECT TI
      </p>

      <h3>{title}</h3>

      <p>{text}</p>

      <ul>
        {benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <TrackedLink
        className="service-card-link"
        href={href}
        eventName="service_click"
        eventParams={{
          ui_location: "services_catalog",
          item_name: title,
          target_path: href,
        }}
      >
        Conhecer serviço
        <span aria-hidden="true">→</span>
      </TrackedLink>
    </article>
  );
}

export function ProductCard({
  product,
}: {
  product: (typeof site.products)[number];
}) {
  return (
    <article className="product-catalog-card card flex flex-col">
      <div className="product-preview relative aspect-video overflow-hidden">
        <Image
          src={product.image}
          alt={`Dashboard do ${product.name}`}
          fill
          sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc(100vw - 4rem), 48vw"
          className="object-contain"
        />
      </div>

      <div className="product-card-content">
        <div className="product-card-heading flex items-start justify-between gap-3">
          <div>
            <p className="product-category">
              {product.category}
            </p>

            <h3 className="text-xl font-semibold text-slate-950">
              {product.name}
            </h3>
          </div>

          <span
            className={`tag ${
              product.status === "Em operação"
                ? "tag-positive"
                : "tag-neutral"
            }`}
          >
            {product.status}
          </span>
        </div>

        <p className="product-description">
          {product.description}
        </p>

        <ul className="product-highlights">
          {product.highlights.map((highlight) => (
            <li key={highlight}>
              {highlight}
            </li>
          ))}
        </ul>

        <p className="product-stack-label">
          Tecnologias principais
        </p>

        <div className="product-stack flex flex-wrap gap-2">
          {product.technologies.map(
            (technology) => (
              <span
                className="product-tech"
                key={technology}
              >
                {technology}
              </span>
            ),
          )}
        </div>

        <TrackedAnchor
          href={product.href}
          className="product-catalog-link inline-flex font-semibold text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
          eventName="product_click"
          eventParams={{
            ui_location: "products_catalog",
            item_name: product.name,
            item_category: product.category,
          }}
        >
          Acessar {product.name}
          <span aria-hidden="true">→</span>
        </TrackedAnchor>
      </div>
    </article>
  );
}

export function CTA() {
  return (
    <section className="bg-slate-950 py-16 sm:py-20">
      <Container className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-blue-300">
            Próximo passo
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Seu sistema precisa evoluir sem
            colocar a operação em risco?
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-300">
            Converse com nossa equipe para
            avaliar o cenário atual, os principais
            riscos e os próximos passos.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={`https://wa.me/${site.whatsapp}`}
          >
            Falar pelo WhatsApp
          </ButtonLink>

          <ButtonLink
            href="/contato"
            secondary
          >
            Enviar uma mensagem
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}