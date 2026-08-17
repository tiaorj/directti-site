"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsParams,
} from "@/lib/analytics";

type TrackingProps = {
  eventName: AnalyticsEventName;
  eventParams?: AnalyticsParams;
};

type TrackedLinkProps =
  ComponentProps<typeof Link> &
  TrackingProps;

type TrackedAnchorProps =
  ComponentProps<"a"> &
  TrackingProps;

export function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}

export function TrackedAnchor({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}