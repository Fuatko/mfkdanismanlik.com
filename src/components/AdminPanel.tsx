"use client";

import { useState, useCallback } from "react";

type Locale = "tr" | "en" | "fr";

const LOCALE_LABELS: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  fr: "Français",
};

export function AdminPanel() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [password, setPassword] = useState("");
  const [contentJson, setContentJson] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loaded, setLoaded] = useState(false);

  const loadContent = useCallback(async () => {
    setMessage(null);
    try {
      const res = await fetch(`/api/content?locale=${locale}`);
      if (!res.ok) throw new Error("İçerik alınamadı");
      const data = await res.json();
      setContentJson(JSON.stringify(data, null, 2));
      setLoaded(true);
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Hata oluştu" });
    }
  }, [locale]);

  const saveContent = useCallback(async () => {
    setMessage(null);
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(contentJson);
    } catch {
      setMessage({ type: "err", text: "Geçersiz JSON. Virgül veya tırnak hatası olabilir." });
      return;
    }
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": password,
        },
        body: JSON.stringify({ locale, content: parsed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");
      setMessage({ type: "ok", text: "Kaydedildi. Siteyi yenileyerek görebilirsiniz." });
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Kayıt hatası" });
    }
  }, [locale, contentJson, password]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-semibold text-zinc-900">
        MFK Danışmanlık – İçerik Düzenleme
      </h1>
      <p className="mb-6 text-sm text-zinc-500">
        Buradan sitedeki metinleri ve resim yollarını tek yerden düzenleyebilirsiniz. Resim eklemek için önce resmi{" "}
        <code className="rounded bg-zinc-100 px-1">public/images/</code> klasörüne koyun, sonra burada{" "}
        <code className="rounded bg-zinc-100 px-1">images → hero</code> alanına örn.{" "}
        <code className="rounded bg-zinc-100 px-1">/images/dosya.jpg</code> yazın.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-700">Dil:</span>
          <select
            value={locale}
            onChange={(e) => {
              setLocale(e.target.value as Locale);
              setLoaded(false);
            }}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            {(Object.keys(LOCALE_LABELS) as Locale[]).map((l) => (
              <option key={l} value={l}>{LOCALE_LABELS[l]}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-700">Admin şifresi:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kaydetmek için gerekli"
            className="w-40 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </label>
        <button
          type="button"
          onClick={loadContent}
          className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          İçeriği getir
        </button>
        {loaded && (
          <button
            type="button"
            onClick={saveContent}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
          >
            Kaydet
          </button>
        )}
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm ${
            message.type === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {loaded ? (
        <textarea
          value={contentJson}
          onChange={(e) => setContentJson(e.target.value)}
          className="min-h-[480px] w-full rounded-lg border border-zinc-300 p-4 font-mono text-sm leading-relaxed text-zinc-800"
          spellCheck={false}
          placeholder="İçerik yükleniyor..."
        />
      ) : (
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-zinc-300 text-zinc-500">
          Önce &quot;İçeriği getir&quot; butonuna tıklayın.
        </div>
      )}

      <p className="mt-4 text-xs text-zinc-400">
        Site adresi:{" "}
        <a href="/tr" className="text-zinc-600 underline hover:text-zinc-800" target="_blank" rel="noreferrer">
          /tr
        </a>{" "}
        |{" "}
        <a href="/en" className="text-zinc-600 underline hover:text-zinc-800" target="_blank" rel="noreferrer">
          /en
        </a>
      </p>
    </div>
  );
}
