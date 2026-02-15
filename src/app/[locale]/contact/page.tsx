import { Mail, Phone, MapPin } from "lucide-react";
import { Section } from "@/components";
import { ContactForm } from "@/components/ContactForm";
import { getTranslations } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale as "tr" | "en" | "fr");
  const c = t.contact as Record<string, string>;
  const contactTranslations = {
    nameLabel: c?.nameLabel,
    emailLabel: c?.emailLabel,
    messageLabel: c?.messageLabel,
    submit: c?.submit,
    sending: c?.sending,
    success: c?.success,
    errorRequired: c?.errorRequired,
  };

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {c?.title ?? "Contact"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {c?.tagline ?? ""}
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-xl font-semibold text-zinc-900">
              {c?.getInTouch ?? "Get in Touch"}
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">{c?.email ?? "Email"}</p>
                  <a
                    href="mailto:hello@mfkdanismanlik.com"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    hello@mfkdanismanlik.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">{c?.phone ?? "Phone"}</p>
                  <a
                    href="tel:+905551234567"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    +90 (555) 123 45 67
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">{c?.address ?? "Address"}</p>
                  <p className="text-sm text-zinc-600">İstanbul, Türkiye</p>
                </div>
              </li>
            </ul>
            <p className="mt-8 text-sm text-zinc-500">{c?.expectText ?? ""}</p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-6 md:p-8">
            <h2 className="mb-6 text-lg font-semibold text-zinc-900">
              {c?.sendMessage ?? "Send a Message"}
            </h2>
            <ContactForm translations={contactTranslations} />
          </div>
        </div>
      </Section>
    </>
  );
}
