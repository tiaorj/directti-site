"use client";

import Link from "next/link";
import { useState } from "react";

import { navItems, site } from "@/config/site";
import { Container } from "@/components/ui";
import {
  TrackedAnchor,
  TrackedLink,
} from "@/components/tracked-link";
import {
  CookiePreferencesButton,
} from "@/components/analytics-consent";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link
          href="/"
          className="brand"
        >
          <span>◈</span>
          DIRECT TI
        </Link>

        <nav
          className="desktop-nav"
          aria-label="Navegação principal"
        >
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <TrackedLink
          href="/contato"
          className="header-cta"
          eventName="cta_click"
          eventParams={{
            ui_location: "header",
            cta_name: "fale_com_especialista",
            target_path: "/contato",
          }}
        >
          Fale com um especialista
        </TrackedLink>

        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={
            open
              ? "Fechar menu"
              : "Abrir menu"
          }
        >
          {open ? "×" : "☰"}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Navegação móvel"
        >
          {navItems.map((item) => (
            <Link
              onClick={() => setOpen(false)}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div>
            <Link
              href="/"
              className="brand"
            >
              <span>◈</span>
              DIRECT TI
            </Link>

            <p>
              Desenvolvimento, modernização e
              sustentação de sistemas corporativos.
            </p>
          </div>

        <div>
        <b>Empresa</b>

        <Link href="/sobre">
            Sobre nós
        </Link>

        <Link href="/cases">
            Cases
        </Link>

        <TrackedLink
            href="/contato"
            eventName="cta_click"
            eventParams={{
            ui_location: "footer",
            cta_name: "contato",
            target_path: "/contato",
            }}
        >
            Contato
        </TrackedLink>

        <Link href="/politica-de-privacidade">
            Política de Privacidade
        </Link>
        <CookiePreferencesButton />
        </div>

          <div>
            <b>Serviços</b>

            <TrackedLink
              href="/servicos"
              eventName="service_click"
              eventParams={{
                ui_location: "footer",
                item_name: "Todos os serviços",
                target_path: "/servicos",
              }}
            >
              Todos os serviços
            </TrackedLink>

            <TrackedLink
              href="/servicos/modernizacao-de-sistemas"
              eventName="service_click"
              eventParams={{
                ui_location: "footer",
                item_name: "Modernização",
                target_path:
                  "/servicos/modernizacao-de-sistemas",
              }}
            >
              Modernização
            </TrackedLink>

            <TrackedLink
              href="/servicos/integracoes-e-apis"
              eventName="service_click"
              eventParams={{
                ui_location: "footer",
                item_name: "Integrações",
                target_path:
                  "/servicos/integracoes-e-apis",
              }}
            >
              Integrações
            </TrackedLink>
          </div>

          <div>
            <b>Produtos</b>

            {site.products.map((product) => (
              <TrackedAnchor
                key={product.name}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                eventName="product_click"
                eventParams={{
                  ui_location: "footer",
                  item_name: product.name,
                  item_category:
                    product.category,
                }}
              >
                {product.name}
              </TrackedAnchor>
            ))}
          </div>

          <div>
            <b>Contato</b>

            <TrackedAnchor
              href={`mailto:${site.email}`}
              eventName="email_click"
              eventParams={{
                ui_location: "footer",
                contact_method: "email",
              }}
            >
              {site.email}
            </TrackedAnchor>

            <TrackedAnchor
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              eventName="whatsapp_click"
              eventParams={{
                ui_location: "footer",
                contact_method: "whatsapp",
              }}
            >
              WhatsApp
            </TrackedAnchor>

            <TrackedAnchor
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              eventName="cta_click"
              eventParams={{
                ui_location: "footer",
                cta_name: "linkedin",
              }}
            >
              LinkedIn
            </TrackedAnchor>
          </div>
        </div>

        <div className="footer-bottom">
        © {new Date().getFullYear()} DIRECT TI
        {" · "}
        Tecnologia que gera resultado.
        {" · "}
        DIRECT TI SOLUÇÕES EM TECNOLOGIA LTDA
        </div>
      </Container>
    </footer>
  );
}