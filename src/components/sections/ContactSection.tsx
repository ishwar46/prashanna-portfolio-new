"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { submitContact } from "@/app/actions/contact";
import { CONTACT, COMPLIANCE, COMPANIES, SECTION_IDS, SERVICES } from "@/lib/constants";
import type { ContactState } from "@/app/actions/contact";

const inputClasses =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20";

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
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          Let&apos;s Talk
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          Get in Touch
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Ready to start your journey? Send me a message and I&apos;ll get back
          to you within 24 hours.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl ring-1 ring-border sm:mt-12"
      >
        <div className="md:grid md:grid-cols-5">
          {/* Form panel */}
          <div className="bg-card p-5 sm:p-6 md:col-span-3 md:p-8">
            {state.success ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 ring-1 ring-gold-500/20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-6 w-6 text-gold-600"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="mt-4 text-lg font-semibold text-foreground">
                  {state.message}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Need to speak sooner? Call{" "}
                  <a
                    href={CONTACT.phoneHref}
                    className="font-medium text-gold-700 underline underline-offset-2"
                  >
                    {CONTACT.phone}
                  </a>
                </p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4 sm:space-y-5">
                {state.success === false && state.message && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                    {state.message}
                  </div>
                )}

                {/* Name & Phone side by side on desktop */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className={inputClasses}
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
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      className={inputClasses}
                      placeholder="(555) 123-4567"
                    />
                    {state.errors?.phone && (
                      <p className="mt-1 text-sm text-destructive">
                        {state.errors.phone[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & Loan Type side by side */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={inputClasses}
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
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Loan Type
                    </label>
                    <select
                      id="contact-loan-type"
                      name="loanType"
                      defaultValue={matchedService?.name ?? ""}
                      className={inputClasses}
                    >
                      <option value="">Not sure yet / General inquiry</option>
                      {SERVICES.map((service) => (
                        <option key={service.slug} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
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

                <button
                  type="submit"
                  disabled={pending}
                  className="h-12 w-full rounded-xl bg-gold-500 text-sm font-bold tracking-wide text-navy-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20 disabled:opacity-50"
                >
                  {pending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className="relative overflow-hidden bg-navy-900 p-5 sm:p-6 md:col-span-2 md:flex md:flex-col md:justify-center md:p-8">
            {/* Dot grid pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, oklch(0.72 0.15 70) 0.5px, transparent 0.5px)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative space-y-5">
              {/* Mortgage contact */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-500">
                  {COMPANIES.loanFactory.role}
                </p>
                <a
                  href={CONTACT.phoneHref}
                  className="mt-2 block text-lg font-bold text-white transition-colors hover:text-gold-400 sm:text-xl"
                >
                  {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.emailHref}
                  className="mt-1 block text-sm text-navy-300 transition-colors hover:text-gold-400"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div className="h-px bg-navy-700/50" />

              {/* Real estate contact */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  {COMPANIES.onest.role}
                </p>
                <a
                  href={CONTACT.realEstatePhoneHref}
                  className="mt-2 block text-lg font-bold text-white transition-colors hover:text-gold-400 sm:text-xl"
                >
                  {CONTACT.realEstatePhone}
                </a>
                <a
                  href={CONTACT.realEstateEmailHref}
                  className="mt-1 block text-sm text-navy-300 transition-colors hover:text-gold-400"
                >
                  {CONTACT.realEstateEmail}
                </a>
              </div>

              <div className="h-px bg-navy-700/50" />

              {/* Office & Credentials */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                  Office
                </p>
                <p className="mt-2 text-sm text-navy-300">{CONTACT.office}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-navy-500">
                    {COMPLIANCE.personalNmls}
                  </p>
                  <p className="text-xs text-navy-500">
                    {COMPLIANCE.realEstateLicense}
                  </p>
                </div>
              </div>

              <div className="h-px bg-navy-700/50" />

              {/* Response time */}
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-gold-500" />
                <p className="text-xs text-navy-400">
                  Typically responds within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
