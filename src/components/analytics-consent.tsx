"use client";

import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import {
  CONSENT_OPEN_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/consent";

function getServerConsent():
  AnalyticsConsent | null {
  return null;
}

export function AnalyticsConsentManager({
  gaId,
}: {
  gaId?: string;
}) {
  const consent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
    getServerConsent,
  );

  const [preferencesOpen, setPreferencesOpen] =
    useState(false);

  useEffect(() => {
    function handleOpen() {
      setPreferencesOpen(true);
    }

    window.addEventListener(
      CONSENT_OPEN_EVENT,
      handleOpen,
    );

    return () => {
      window.removeEventListener(
        CONSENT_OPEN_EVENT,
        handleOpen,
      );
    };
  }, []);

  const isOpen =
    consent === null || preferencesOpen;

  function choose(
    value: AnalyticsConsent,
  ) {
    setAnalyticsConsent(value);
    setPreferencesOpen(false);
  }

  return (
    <>
      {gaId &&
      consent === "accepted" ? (
        <GoogleAnalytics gaId={gaId} />
      ) : null}

      {isOpen ? (
        <aside
          className="cookie-consent"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="cookie-consent-inner">
            <div className="cookie-consent-copy">
              <p className="eyebrow">
                Privacidade
              </p>

              <h2 id="cookie-consent-title">
                Cookies e análise de navegação
              </h2>

              <p id="cookie-consent-description">
                Usamos recursos essenciais para
                o funcionamento do site. Com sua
                autorização, também utilizamos
                Google Analytics para entender
                navegação e interações e melhorar
                nossos canais digitais.
              </p>

              <Link href="/politica-de-privacidade">
                Saiba mais na Política de
                Privacidade
              </Link>
            </div>

            <div className="cookie-consent-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  choose("rejected")
                }
              >
                Rejeitar análise
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  choose("accepted")
                }
              >
                Aceitar análise
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}

export function CookiePreferencesButton() {
  function openPreferences() {
    window.dispatchEvent(
      new Event(CONSENT_OPEN_EVENT),
    );
  }

  return (
    <button
      type="button"
      className="footer-cookie-button"
      onClick={openPreferences}
    >
      Preferências de cookies
    </button>
  );
}