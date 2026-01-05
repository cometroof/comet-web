interface Window {
  gtag: (
    command: "event",
    eventName: string,
    eventParams: {
      [key: string]: string | number | boolean | undefined;
      app_name?: string;
      screen_name?: string;
    }
  ) => void;
}
