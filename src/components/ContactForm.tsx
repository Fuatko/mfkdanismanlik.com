"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ContactFormTranslations {
  nameLabel?: string;
  emailLabel?: string;
  messageLabel?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
  submit?: string;
  sending?: string;
  success?: string;
  errorRequired?: string;
}

const defaults: ContactFormTranslations = {
  nameLabel: "Ad Soyad",
  emailLabel: "E-posta",
  messageLabel: "Mesaj",
  namePlaceholder: "Adınız Soyadınız",
  emailPlaceholder: "ornek@firma.com",
  messagePlaceholder: "Nasıl yardımcı olabiliriz?",
  submit: "Gönder",
  sending: "Gönderiliyor…",
  success: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
  errorRequired: "Ad, e-posta ve mesaj alanları zorunludur.",
};

interface ContactFormProps {
  translations?: ContactFormTranslations;
}

export function ContactForm({ translations: t = {} }: ContactFormProps) {
  const txt = { ...defaults, ...t };
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const message = (fd.get("message") as string)?.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg(txt.errorRequired ?? "");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "");
      }
    } catch {
      setStatus("error");
      setErrorMsg("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-700">
          {txt.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={status === "loading"}
          className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 disabled:opacity-60"
          placeholder={txt.namePlaceholder}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700">
          {txt.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === "loading"}
          className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 disabled:opacity-60"
          placeholder={txt.emailPlaceholder}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-700">
          {txt.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          disabled={status === "loading"}
          className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 disabled:opacity-60"
          placeholder={txt.messagePlaceholder}
        />
      </div>

      {status === "success" && (
        <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          {txt.success}
        </p>
      )}
      {status === "error" && errorMsg && (
        <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60"
      >
        {status === "loading" ? txt.sending : txt.submit}
        <Send size={16} />
      </button>
    </form>
  );
}
