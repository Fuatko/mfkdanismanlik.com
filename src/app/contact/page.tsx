import { Mail, Phone, MapPin } from "lucide-react";
import { Section } from "@/components";
import { ContactForm } from "@/components/ContactForm";
import { getPageContent } from "@/lib/content";

export default function ContactPage() {
  const content = getPageContent("contact");

  return (
    <>
      <Section>
        <h1 className="mb-4 text-3xl font-semibold text-zinc-900 md:text-4xl">
          {content?.frontmatter.title ?? "Contact"}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-zinc-600">
          {content?.frontmatter.tagline}
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-xl font-semibold text-zinc-900">Get in Touch</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">Email</p>
                  <a
                    href="mailto:hello@consulting.example.com"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    hello@consulting.example.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">Phone</p>
                  <a
                    href="tel:+15551234567"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium text-zinc-900">Address</p>
                  <p className="text-sm text-zinc-600">
                    123 Strategy Avenue, Suite 100, Business City
                  </p>
                </div>
              </li>
            </ul>
            <p className="mt-8 text-sm text-zinc-500">
              We typically respond within one business day. For urgent inquiries, please
              call directly.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-6 md:p-8">
            <h2 className="mb-6 text-lg font-semibold text-zinc-900">Mesaj Gönderin</h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
