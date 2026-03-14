"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/actions/contact";
import { CONTACT, SECTION_IDS, SERVICES } from "@/lib/constants";
import type { ContactState } from "@/app/actions/contact";

export function ContactSection() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    {}
  );
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const matchedService = SERVICES.find((s) => s.slug === serviceParam);

  return (
    <SectionWrapper id={SECTION_IDS.contact}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Get in Touch
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
          Ready to start your journey? Send me a message and I&apos;ll get back
          to you within 24 hours.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xl sm:mt-12">
        {state.success ? (
          <div className="rounded-xl border border-border bg-card p-5 text-center sm:p-8">
            <p className="text-lg font-semibold text-foreground">
              {state.message}
            </p>
            <p className="mt-4 text-muted-foreground">
              Need to speak with me sooner? Call{" "}
              <a
                href={CONTACT.phoneHref}
                className="font-medium text-primary underline underline-offset-2"
              >
                {CONTACT.phone}
              </a>
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4 sm:space-y-5">
            {state.success === false && state.message && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                {state.message}
              </div>
            )}

            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Your full name"
              />
              {state.errors?.name && (
                <p className="mt-1 text-sm text-destructive">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Phone <span className="text-destructive">*</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="(555) 123-4567"
              />
              {state.errors?.phone && (
                <p className="mt-1 text-sm text-destructive">
                  {state.errors.phone[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="you@example.com"
              />
              {state.errors?.email && (
                <p className="mt-1 text-sm text-destructive">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-loan-type"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Loan Type
              </label>
              <select
                id="contact-loan-type"
                name="loanType"
                defaultValue={matchedService?.name ?? ""}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Not sure yet / General inquiry</option>
                {SERVICES.map((service) => (
                  <option key={service.slug} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Tell me about your goals..."
              />
            </div>

            <input
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
}
