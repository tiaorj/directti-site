"use client";

import { useState } from "react";
import { site } from "@/config/site";

export function ContactForm() {
  const [mode, setMode] = useState<"email" | "whatsapp">("email");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const message = [
      `Nome: ${data.get("name")}`,
      `Empresa: ${data.get("company")}`,
      `E-mail: ${data.get("email")}`,
      `Interesse: ${data.get("interest")}`,
      "",
      `${data.get("message")}`,
    ].join("\n");

    const subject = encodeURIComponent(
      `Contato pelo site: ${data.get("interest")}`,
    );

    if (mode === "email") {
      window.location.href =
        `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(message)}`;
      return;
    }

    window.location.href =
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  }

  return (
    <form onSubmit={submit} className="contact-form">
      <div className="contact-form-grid">
        <label>
          <span className="field-label">
            Nome
            <span className="required-mark" aria-hidden="true">
              *
            </span>
          </span>

          <input
            required
            name="name"
            className="field"
            autoComplete="name"
          />
        </label>

        <label>
          <span className="field-label">Empresa</span>

          <input
            name="company"
            className="field"
            autoComplete="organization"
          />
        </label>
      </div>

      <label>
        <span className="field-label">
          E-mail
          <span className="required-mark" aria-hidden="true">
            *
          </span>
        </span>

        <input
          required
          type="email"
          name="email"
          className="field"
          autoComplete="email"
        />
      </label>

      <label>
        <span className="field-label">Assunto / interesse</span>

        <select
          name="interest"
          className="field"
          defaultValue="Modernização"
        >
          <option>Modernização</option>
          <option>Desenvolvimento</option>
          <option>Sustentação</option>
          <option>Integrações</option>
          <option>Dados e BI</option>
          <option>IA e automação</option>
          <option>Outro</option>
        </select>
      </label>

      <label>
        <span className="field-label">
          Como podemos ajudar?
          <span className="required-mark" aria-hidden="true">
            *
          </span>
        </span>

        <textarea
          required
          name="message"
          rows={5}
          className="field"
        />
      </label>

      <div className="contact-form-actions">
        <button className="btn btn-primary" type="submit">
          Enviar por {mode === "email" ? "e-mail" : "WhatsApp"}
          <span aria-hidden="true">→</span>
        </button>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={() =>
            setMode(mode === "email" ? "whatsapp" : "email")
          }
        >
          Usar {mode === "email" ? "WhatsApp" : "e-mail"}
        </button>
      </div>

      <p>
        Ao enviar, será aberto seu aplicativo de e-mail ou WhatsApp.
        Não armazenamos os dados deste formulário.
      </p>
    </form>
  );
}