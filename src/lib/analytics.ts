"use client";

import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsEventName =
  | "cta_click"
  | "whatsapp_click"
  | "email_click"
  | "product_click"
  | "service_click"
  | "generate_lead"
  | "lead_submit_error";

export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsParams = {},
) {
  if (!process.env.NEXT_PUBLIC_GA_ID) {
    return;
  }

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined,
    ),
  );

  sendGAEvent("event", eventName, {
    ...cleanParams,

    page_path:
      typeof window !== "undefined"
        ? window.location.pathname
        : undefined,
  });
}