export type AnalyticsConsent =
  | "accepted"
  | "rejected";

export const ANALYTICS_CONSENT_KEY =
  "directti_analytics_consent";

export const CONSENT_CHANGED_EVENT =
  "directti:analytics-consent-changed";

export const CONSENT_OPEN_EVENT =
  "directti:analytics-consent-open";

export function getAnalyticsConsent():
  AnalyticsConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(
    ANALYTICS_CONSENT_KEY,
  );

  if (
    value === "accepted" ||
    value === "rejected"
  ) {
    return value;
  }

  return null;
}

export function setAnalyticsConsent(
  consent: AnalyticsConsent,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    ANALYTICS_CONSENT_KEY,
    consent,
  );

  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGED_EVENT, {
      detail: consent,
    }),
  );
}

export function subscribeAnalyticsConsent(
  callback: () => void,
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleStorage(
    event: StorageEvent,
  ) {
    if (
      event.key === ANALYTICS_CONSENT_KEY
    ) {
      callback();
    }
  }

  function handleConsentChange() {
    callback();
  }

  window.addEventListener(
    "storage",
    handleStorage,
  );

  window.addEventListener(
    CONSENT_CHANGED_EVENT,
    handleConsentChange,
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorage,
    );

    window.removeEventListener(
      CONSENT_CHANGED_EVENT,
      handleConsentChange,
    );
  };
}

export function hasAnalyticsConsent() {
  return (
    getAnalyticsConsent() === "accepted"
  );
}