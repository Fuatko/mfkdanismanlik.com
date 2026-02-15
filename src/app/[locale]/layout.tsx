import { notFound } from "next/navigation";
import { Header, Footer, LocaleHtml } from "@/components";
import { locales, isValidLocale, getTranslations } from "@/lib/i18n";

// Panelden kaydedilen içerik hemen görünsün; sayfa önbelleğe alınmasın
export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations(locale);

  return (
    <>
      <LocaleHtml locale={locale} />
      <Header locale={locale} translations={t} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} translations={t} />
    </>
  );
}
