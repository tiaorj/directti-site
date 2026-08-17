"use client";

import { useEffect } from "react";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

export type AttributionData = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  landingPath: string;
};

const STORAGE_KEY =
  "directti_commercial_attribution";

export function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const attribution: AttributionData = {
      utmSource:
        searchParams.get("utm_source") ?? "",

      utmMedium:
        searchParams.get("utm_medium") ?? "",

      utmCampaign:
        searchParams.get("utm_campaign") ?? "",

      utmContent:
        searchParams.get("utm_content") ?? "",

      utmTerm:
        searchParams.get("utm_term") ?? "",

      landingPath: pathname,
    };

    const hasCampaign =
      attribution.utmSource ||
      attribution.utmMedium ||
      attribution.utmCampaign ||
      attribution.utmContent ||
      attribution.utmTerm;

    if (!hasCampaign) {
      return;
    }

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(attribution),
    );
  }, [pathname, searchParams]);

  return null;
}

export function getStoredAttribution():
  AttributionData | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored =
      sessionStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(
      stored,
    ) as AttributionData;
  } catch {
    return null;
  }
}