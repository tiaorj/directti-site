"use client";

import Link from "next/link";
import { useState } from "react";

import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { TrackedAnchor } from "@/components/tracked-link";
import {
  getStoredAttribution,
} from "@/components/attribution-tracker";

type LeadSnapshot = {
  name: string;
  company: string;
  email: string;
  interest: string;
  message: string;
};

type LeadApiResponse = {
  ok: boolean;
  error?: string;
};

function buildWhatsappUrl(lead: LeadSnapshot) {
  const message = [
    "Olá, enviei um contato pelo site da DIRECT TI.",
    "",
    `Nome: ${lead.name}`,
    lead.company
      ? `Empresa: ${lead.company}`
      : null,
    `E-mail: ${lead.email}`,
    `Interesse: ${lead.interest}`,
    "",
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    message,
  )}`;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [submittedLead, setSubmittedLead] =
    useState<LeadSnapshot | null>(null);

  async function submit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const lead: LeadSnapshot = {
      name: String(data.get("name") ?? "").trim(),
      company: String(
        data.get("company") ?? "",
      ).trim(),
      email: String(
        data.get("email") ?? "",
      )
        .trim()
        .toLowerCase(),
      interest: String(
        data.get("interest") ?? "",
      ).trim(),
      message: String(
        data.get("message") ?? "",
      ).trim(),
    };

    const website = String(
      data.get("website") ?? "",
    ).trim();

    const searchParams =
      new URLSearchParams(
        window.location.search,
      );

    const storedAttribution =
      getStoredAttribution();

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "/api/leads",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...lead,

            website,

            sourceType: "contact_form",

            sourcePath:
              window.location.pathname,

            referrer:
              document.referrer || "",

            utmSource:
              searchParams.get("utm_source") ??
              storedAttribution?.utmSource ??
              "",            
            utmMedium:
              searchParams.get("utm_medium") ??
              storedAttribution?.utmMedium ??
              "",

            utmCampaign:
              searchParams.get("utm_campaign") ??
              storedAttribution?.utmCampaign ??
              "",

            utmContent:
              searchParams.get("utm_content") ??
              storedAttribution?.utmContent ??
              "",

            utmTerm:
              searchParams.get("utm_term") ??
              storedAttribution?.utmTerm ??
              "",
          }),
        },
      );

      const result =
        (await response
          .json()
          .catch(() => ({
            ok: false,
          }))) as LeadApiResponse;

      if (
        response.status !== 201 ||
        !result.ok
      ) {
        throw new Error(
          result.error ??
            "LEAD_SUBMIT_FAILED",
        );
      }

      /*
       * Somente aqui o lead é considerado
       * efetivamente gerado.
       *
       * Nunca enviar nome, e-mail, empresa
       * ou mensagem para o Analytics.
       */
      trackEvent("generate_lead", {
        source: "contact_form",
        interest: lead.interest,
      });

      setSubmittedLead(lead);

      form.reset();
    } catch (error) {
      const errorCode =
        error instanceof Error
          ? error.message
          : "UNKNOWN_ERROR";

      trackEvent(
        "lead_submit_error",
        {
          source: "contact_form",
          interest: lead.interest,
          error_code: errorCode,
        },
      );

      setErrorMessage(
        "Não foi possível enviar sua mensagem agora. Tente novamente em alguns instantes ou fale conosco pelo WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedLead) {
    return (
      <div
        className="contact-success"
        role="status"
      >
        <div
          className="contact-success-icon"
          aria-hidden="true"
        >
          ✓
        </div>

        <p className="eyebrow">
          Contato recebido
        </p>

        <h3>
          Obrigado pelo contato.
        </h3>

        <p>
          Sua mensagem foi registrada com
          sucesso. A DIRECT TI poderá
          continuar o atendimento pelos
          dados informados.
        </p>

        <div className="contact-success-actions">
          <TrackedAnchor
            className="btn btn-primary"
            href={buildWhatsappUrl(
              submittedLead,
            )}
            target="_blank"
            rel="noopener noreferrer"
            eventName="whatsapp_click"
            eventParams={{
              ui_location:
                "lead_success",
              contact_method:
                "whatsapp",
              interest:
                submittedLead.interest,
            }}
          >
            Continuar pelo WhatsApp
            <span aria-hidden="true">
              →
            </span>
          </TrackedAnchor>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSubmittedLead(null);
              setErrorMessage(null);
            }}
          >
            Enviar outro contato
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="contact-form"
    >
    <div
      className="contact-honeypot"
      aria-hidden="true"
    >
      <label htmlFor="contact_website_check">
        Não preencha este campo
      </label>

      <input
        id="contact_website_check"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="new-password"
        defaultValue=""
      />
    </div>

      <div className="contact-form-grid">
        <label>
          <span className="field-label">
            Nome
            <span className="required-mark">
              *
            </span>
          </span>

          <input
            required
            name="name"
            className="field"
            autoComplete="name"
            minLength={2}
            maxLength={120}
          />
        </label>

        <label>
          <span className="field-label">
            Empresa
          </span>

          <input
            name="company"
            className="field"
            autoComplete="organization"
            maxLength={160}
          />
        </label>
      </div>

      <label>
        <span className="field-label">
          E-mail
          <span className="required-mark">
            *
          </span>
        </span>

        <input
          required
          type="email"
          name="email"
          className="field"
          autoComplete="email"
          maxLength={254}
        />
      </label>

      <label>
        <span className="field-label">
          Assunto / interesse
        </span>

        <select
          name="interest"
          className="field"
          defaultValue="Modernização"
        >
          <option>Legado360</option>
          <option>Modernização</option>
          <option>Desenvolvimento</option>
          <option>Sustentação</option>
          <option>Integrações</option>
          <option>Dados e BI</option>
          <option>
            IA e automação
          </option>
          <option>Outro</option>
        </select>
      </label>

      <label>
        <span className="field-label">
          Como podemos ajudar?
          <span className="required-mark">
            *
          </span>
        </span>

        <textarea
          required
          name="message"
          rows={5}
          className="field"
          minLength={10}
          maxLength={5000}
        />
      </label>

      {errorMessage && (
        <div
          className="contact-form-feedback contact-form-feedback-error"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <div className="contact-form-actions">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Enviando..."
            : "Enviar contato"}

          {!isSubmitting && (
            <span aria-hidden="true">
              →
            </span>
          )}
        </button>

        <TrackedAnchor
          className="btn btn-secondary"
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          eventName="whatsapp_click"
          eventParams={{
            ui_location:
              "contact_form",
            contact_method:
              "whatsapp_direct",
          }}
        >
          Usar WhatsApp
        </TrackedAnchor>
      </div>

      <p className="contact-privacy-note">
        Ao enviar, seus dados serão
        utilizados para atendimento e
        acompanhamento da solicitação.
        {" "}
        <Link href="/politica-de-privacidade">
          Consulte nossa Política de
          Privacidade.
        </Link>
      </p>
    </form>
  );
}