"use client";

import { useState, useCallback, useEffect } from "react";

type Locale = "tr" | "en" | "fr";

const LOCALE_LABELS: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  fr: "Français",
};

// Path'e göre nested objeden değer al
function getAt(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return "";
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : "";
}

// Nested objede path'e değer yaz (objeyi değiştirir)
function setAt(obj: Record<string, unknown>, path: string, value: string) {
  const parts = path.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!(p in cur) || typeof (cur as Record<string, unknown>)[p] !== "object") {
      (cur as Record<string, unknown>)[p] = {};
    }
    cur = (cur as Record<string, unknown>)[p] as Record<string, unknown>;
  }
  (cur as Record<string, unknown>)[parts[parts.length - 1]] = value;
}

// Deep clone
function clone(obj: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(JSON.stringify(obj));
}

type Field = { path: string; label: string; placeholder?: string };
type Section = { title: string; fields: Field[] };

const SECTIONS: Section[] = [
  {
    title: "Resimler",
    fields: [
      { path: "images.hero", label: "Ana sayfa üst banner resmi", placeholder: "Örn: /images/hero.jpg (boş bırakırsanız resim gösterilmez)" },
      { path: "images.aboutTeam", label: "Hakkımızda sayfası resmi", placeholder: "Örn: /images/ekip.jpg" },
    ],
  },
  {
    title: "Menü (üst navigasyon)",
    fields: [
      { path: "nav.home", label: "Ana Sayfa" },
      { path: "nav.services", label: "Hizmetler" },
      { path: "nav.methodology", label: "Metodoloji" },
      { path: "nav.cases", label: "Referanslar" },
      { path: "nav.resources", label: "Kaynaklar" },
      { path: "nav.about", label: "Hakkımızda" },
      { path: "nav.contact", label: "İletişim" },
    ],
  },
  {
    title: "Ana sayfa – Üst bölüm",
    fields: [
      { path: "home.title", label: "Ana başlık" },
      { path: "home.tagline", label: "Alt başlık" },
      { path: "home.hero_abstract", label: "Kısa özet (bir cümle)" },
    ],
  },
  {
    title: "Ana sayfa – Neden biz / Yaklaşım",
    fields: [
      { path: "home.whyUs", label: "Neden Bizimle Çalışmalısınız? (başlık)" },
      { path: "home.approach", label: "Yaklaşımımız (başlık)" },
    ],
  },
  {
    title: "Ana sayfa – Dört kutu (Strateji, Operasyonlar, Dönüşüm, İnsan)",
    fields: [
      { path: "home.cards.strategy", label: "1. Kutu başlık (Strateji)" },
      { path: "home.cards.strategyDesc", label: "1. Kutu açıklama" },
      { path: "home.cards.operations", label: "2. Kutu başlık (Operasyonlar)" },
      { path: "home.cards.operationsDesc", label: "2. Kutu açıklama" },
      { path: "home.cards.transformation", label: "3. Kutu başlık (Dönüşüm)" },
      { path: "home.cards.transformationDesc", label: "3. Kutu açıklama" },
      { path: "home.cards.people", label: "4. Kutu başlık (İnsan)" },
      { path: "home.cards.peopleDesc", label: "4. Kutu açıklama" },
    ],
  },
  {
    title: "Ana sayfa – Beş adım (Keşfet → Sürdür)",
    fields: [
      { path: "home.steps.discover", label: "Adım 1 başlık" },
      { path: "home.steps.discoverDesc", label: "Adım 1 açıklama" },
      { path: "home.steps.diagnose", label: "Adım 2 başlık" },
      { path: "home.steps.diagnoseDesc", label: "Adım 2 açıklama" },
      { path: "home.steps.design", label: "Adım 3 başlık" },
      { path: "home.steps.designDesc", label: "Adım 3 açıklama" },
      { path: "home.steps.deliver", label: "Adım 4 başlık" },
      { path: "home.steps.deliverDesc", label: "Adım 4 açıklama" },
      { path: "home.steps.sustain", label: "Adım 5 başlık" },
      { path: "home.steps.sustainDesc", label: "Adım 5 açıklama" },
    ],
  },
  {
    title: "Ana sayfa – Son çağrı kutusu (İletişime geçin)",
    fields: [
      { path: "home.ctaTitle", label: "Kutu başlığı" },
      { path: "home.ctaDesc", label: "Kutu açıklaması" },
    ],
  },
  {
    title: "Hakkımızda sayfası",
    fields: [
      { path: "about.title", label: "Sayfa başlığı" },
      { path: "about.tagline", label: "Alt başlık" },
      { path: "about.whoWeAre", label: "Biz Kimiz (başlık)" },
      { path: "about.whoWeAreText", label: "Biz Kimiz (paragraf metni)", placeholder: "Uzun metin yazabilirsiniz" },
      { path: "about.values", label: "Değerlerimiz (başlık)" },
      { path: "about.valuesList.integrity", label: "Değer 1 – Dürüstlük" },
      { path: "about.valuesList.integrityDesc", label: "Değer 1 açıklama" },
      { path: "about.valuesList.excellence", label: "Değer 2 – Mükemmellik" },
      { path: "about.valuesList.excellenceDesc", label: "Değer 2 açıklama" },
      { path: "about.valuesList.collaboration", label: "Değer 3 – İşbirliği" },
      { path: "about.valuesList.collaborationDesc", label: "Değer 3 açıklama" },
      { path: "about.valuesList.impact", label: "Değer 4 – Etki" },
      { path: "about.valuesList.impactDesc", label: "Değer 4 açıklama" },
    ],
  },
  {
    title: "İletişim sayfası",
    fields: [
      { path: "contact.title", label: "Sayfa başlığı" },
      { path: "contact.tagline", label: "Alt başlık" },
      { path: "contact.getInTouch", label: "Bize Ulaşın (başlık)" },
      { path: "contact.contactInfo", label: "İletişim Bilgileri (başlık)" },
      { path: "contact.expectText", label: "Beklenen süre metni" },
      { path: "contact.sendMessage", label: "Mesaj Gönderin (başlık)" },
      { path: "contact.nameLabel", label: "Form – Ad Soyad etiketi" },
      { path: "contact.emailLabel", label: "Form – E-posta etiketi" },
      { path: "contact.messageLabel", label: "Form – Mesaj etiketi" },
      { path: "contact.submit", label: "Gönder butonu metni" },
      { path: "contact.success", label: "Başarı mesajı (gönderildikten sonra)" },
      { path: "contact.errorRequired", label: "Hata mesajı (eksik alan)" },
    ],
  },
  {
    title: "Footer (sayfa altı)",
    fields: [
      { path: "footer.brand", label: "Firma adı" },
      { path: "footer.brandDesc", label: "Kısa açıklama" },
      { path: "footer.navigation", label: "Navigasyon (başlık)" },
      { path: "footer.rights", label: "Tüm hakları saklıdır metni" },
    ],
  },
  {
    title: "Genel – Sayfa sonu çağrı kutusu (tüm sayfalarda)",
    fields: [
      { path: "cta.title", label: "Başlık" },
      { path: "cta.desc", label: "Açıklama" },
      { path: "cta.button", label: "Buton metni (örn: İletişime Geçin)" },
    ],
  },
  {
    title: "Diğer sayfa başlıkları",
    fields: [
      { path: "services.title", label: "Hizmetler sayfası başlığı" },
      { path: "services.tagline", label: "Hizmetler sayfası alt başlık" },
      { path: "methodology.title", label: "Metodoloji sayfası başlığı" },
      { path: "methodology.tagline", label: "Metodoloji sayfası alt başlık" },
      { path: "cases.title", label: "Referanslar sayfası başlığı" },
      { path: "cases.tagline", label: "Referanslar sayfası alt başlık" },
      { path: "resources.title", label: "Kaynaklar sayfası başlığı" },
      { path: "resources.tagline", label: "Kaynaklar sayfası alt başlık" },
    ],
  },
];

export function AdminPanel() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadContent = useCallback(async () => {
    setMessage(null);
    try {
      const res = await fetch(`/api/content?locale=${locale}`);
      if (!res.ok) throw new Error("İçerik alınamadı");
      const content = (await res.json()) as Record<string, unknown>;
      const flat: Record<string, string> = {};
      for (const section of SECTIONS) {
        for (const field of section.fields) {
          flat[field.path] = getAt(content, field.path);
        }
      }
      setFormData(flat);
      setLoaded(true);
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Hata oluştu" });
    }
  }, [locale]);

  useEffect(() => {
    if (loaded) loadContent();
  }, [locale]); // locale değişince içeriği yeniden yükle

  const setField = useCallback((path: string, value: string) => {
    setFormData((prev) => ({ ...prev, [path]: value }));
  }, []);

  const saveContent = useCallback(async () => {
    setMessage(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/content?locale=${locale}`);
      if (!res.ok) throw new Error("Mevcut içerik alınamadı");
      const content = clone((await res.json()) as Record<string, unknown>);
      for (const path of Object.keys(formData)) {
        setAt(content, path, formData[path] ?? "");
      }
      const saveRes = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": password,
        },
        body: JSON.stringify({ locale, content }),
      });
      const data = await saveRes.json();
      if (!saveRes.ok) throw new Error(data.error || "Kayıt başarısız");
      setMessage({ type: "ok", text: "Kaydedildi. Siteyi yenileyerek görebilirsiniz." });
    } catch (e) {
      setMessage({ type: "err", text: e instanceof Error ? e.message : "Kayıt hatası" });
    } finally {
      setSaving(false);
    }
  }, [locale, formData, password]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-semibold text-zinc-900">
        MFK Danışmanlık – İçerik düzenleme
      </h1>
      <p className="mb-6 text-sm text-zinc-500">
        Aşağıdaki kutularda metinleri doğrudan düzenleyin. Kaydettikten sonra sitede görünür. Resim eklemek için önce resmi projedeki <strong>public/images/</strong> klasörüne koyun, sonra &quot;Ana sayfa üst banner resmi&quot; kutusuna <strong>/images/dosyaadi.jpg</strong> yazın.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-700">Dil:</span>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            {(Object.keys(LOCALE_LABELS) as Locale[]).map((l) => (
              <option key={l} value={l}>{LOCALE_LABELS[l]}</option>
            ))}
          </select>
        </label>
        {!loaded ? (
          <button
            type="button"
            onClick={loadContent}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            İçeriği yükle
          </button>
        ) : (
          <>
            <label className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-700">Kaydetmek için şifre:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin şifresi"
                className="w-40 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              />
            </label>
            <button
              type="button"
              onClick={saveContent}
              disabled={saving}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
            >
              {saving ? "Kaydediliyor…" : "Kaydet"}
            </button>
          </>
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

      {loaded && (
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title} className="border-b border-zinc-100 pb-8 last:border-0">
              <h2 className="mb-4 text-lg font-semibold text-zinc-800">{section.title}</h2>
              <div className="space-y-3">
                {section.fields.map((field) => (
                  <label key={field.path} className="block">
                    <span className="mb-1 block text-sm font-medium text-zinc-600">{field.label}</span>
                    <input
                      type="text"
                      value={formData[field.path] ?? ""}
                      onChange={(e) => setField(field.path, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                    />
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {!loaded && (
        <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-zinc-300 text-zinc-500">
          Yukarıdan dil seçip &quot;İçeriği yükle&quot; butonuna tıklayın.
        </div>
      )}

      <p className="mt-6 text-xs text-zinc-400">
        Site:{" "}
        <a href="/tr" className="text-zinc-600 underline hover:text-zinc-800" target="_blank" rel="noreferrer">
          Ana sayfa (TR)
        </a>
        {" · "}
        <a href="/en" className="text-zinc-600 underline hover:text-zinc-800" target="_blank" rel="noreferrer">
          EN
        </a>
      </p>
    </div>
  );
}
