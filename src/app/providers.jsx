"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GoogleReCaptchaProvider>
  );
}