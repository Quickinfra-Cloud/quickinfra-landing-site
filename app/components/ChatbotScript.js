"use client";

import { useEffect } from "react";

export default function ChatbotScript() {
  useEffect(() => {
    const existing = document.getElementById("chatbot");
    if (existing) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://res.public.onecdn.static.microsoft/customerconnect/v1/7dttl/init.js";
    script.id = "chatbot";
    script.setAttribute("environmentId", "1348d539-7601-e484-b790-0d00cf144ddb");
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);

    return () => {
      const injected = document.getElementById("chatbot");
      if (injected) injected.remove();
    };
  }, []);

  return null;
}