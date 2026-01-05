"use client";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = (
  eventName: string,
  parameters: { [key: string]: any }
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, {
      ...parameters,
      app_name: "web-comet",
    });
  }
};
