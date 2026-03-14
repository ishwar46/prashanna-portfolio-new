import Image from "next/image";
import { SECTION_IDS, CONTACT, COMPLIANCE, COMPANIES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative overflow-hidden bg-navy-950 pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-32 md:pb-16"
    >
      {/* Layered background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-navy-900 via-navy-950 to-navy-900" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.72 0.15 70) 0.75px, transparent 0.75px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -right-32 top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold-500/[0.04] blur-3xl md:block" />
        <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-navy-700/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 sm:gap-10 md:flex-row md:items-center md:gap-16 md:py-16 lg:gap-20 lg:py-20">
        {/* Text column */}
        <div className="flex-1 text-center md:text-left">
          {/* Dual role kicker */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:justify-start">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
              {COMPANIES.loanFactory.role}
            </span>
            <span className="hidden h-3 w-px bg-navy-600 sm:block" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
              {COMPANIES.onest.role}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Your Home Journey
            <br />
            <span className="text-gold-400">Starts Here</span>
          </h1>

          <div className="mx-auto mt-5 h-px w-16 bg-linear-to-r from-gold-500 to-gold-500/0 md:mx-0" />

          <p className="mt-5 max-w-lg text-base leading-relaxed text-navy-300 sm:text-lg">
            From finding your dream home to securing the perfect loan&mdash;I
            handle both. One professional for your entire home buying journey.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-5 md:justify-start">
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-lg bg-gold-500 px-7 text-sm font-bold tracking-wide text-navy-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
            >
              Get a Free Consultation
            </a>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-navy-300 transition-colors hover:text-gold-400"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-navy-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-3.5 w-3.5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              {CONTACT.phone}
            </a>
          </div>

          {/* Trust badges — dual credentials */}
          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 md:items-start">
            <div className="inline-flex items-center rounded-full bg-navy-800/50 px-3.5 py-1.5 ring-1 ring-navy-700/50">
              <span className="text-[11px] font-medium tracking-wide text-navy-200">
                {COMPLIANCE.personalNmls}
              </span>
            </div>
            <div className="inline-flex items-center rounded-full bg-navy-800/50 px-3.5 py-1.5 ring-1 ring-navy-700/50">
              <span className="text-[11px] font-medium tracking-wide text-navy-200">
                {COMPLIANCE.realEstateLicense}
              </span>
            </div>
          </div>
        </div>

        {/* Photo column */}
        <div className="relative shrink-0">
          <div className="absolute -left-3 top-4 bottom-4 w-[3px] rounded-full bg-linear-to-b from-gold-500/0 via-gold-500 to-gold-500/0 sm:-left-4" />
          <div className="relative">
            <Image
              src="/images/prashanna.webp"
              alt="Prashanna Sangroula — Mortgage Loan Officer & Realtor"
              width={380}
              height={460}
              priority
              className="h-56 w-44 rounded-2xl object-cover object-top shadow-2xl shadow-navy-950/50 ring-1 ring-white/10 sm:h-72 sm:w-56 md:h-[360px] md:w-[270px] lg:h-[400px] lg:w-[300px]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-t from-navy-950/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
