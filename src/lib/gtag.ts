"use client";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = (
  eventName: string,
  parameters: Record<string, string | number | boolean | undefined>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...parameters,
      app_name: "web-comet",
    });
  }
};
