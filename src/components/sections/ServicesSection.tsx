"use client";

import { useState } from "react";
import { m } from "motion/react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS, SERVICES } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

type Category = "all" | "mortgage" | "real-estate";

const TABS: { label: string; value: Category }[] = [
  { label: "All Services", value: "all" },
  { label: "Mortgage", value: "mortgage" },
  { label: "Real Estate", value: "real-estate" },
];

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filtered =
    activeTab === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeTab);

  return (
    <SectionWrapper id={SECTION_IDS.services} alternate>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-800">
          What I Offer
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          Services
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Mortgage lending and real estate — one professional for your entire
          home journey
        </p>
      </div>

      {/* Category tabs */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex gap-1 rounded-xl bg-navy-900/5 p-1 ring-1 ring-border">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all sm:px-5 sm:text-sm ${
                activeTab === tab.value
                  ? "bg-navy-900 text-white shadow-sm"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((service, index) => (
          <m.a
            variants={itemVariants}
            key={service.slug}
            href={`?service=${service.slug}#contact`}
            data-service={service.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-card p-5 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/5 hover:ring-gold-500/40 sm:p-6"
          >
            {/* Number accent */}
            <span className="absolute -right-2 -top-3 text-7xl font-black leading-none text-navy-900/[0.04] transition-colors duration-300 group-hover:text-gold-500/10 sm:text-8xl">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Category badge */}
            <span
              className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                service.category === "real-estate"
                  ? "bg-navy-900/5 text-navy-600"
                  : "bg-gold-500/10 text-gold-700"
              }`}
            >
              {service.category === "real-estate" ? "Real Estate" : "Mortgage"}
            </span>

            {/* Content */}
            <div className="relative mt-3">
              <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-navy-900 sm:text-lg">
                {service.name}
              </h3>

              <div className="my-3 h-px w-8 bg-gold-500/60 transition-all duration-300 group-hover:w-12 group-hover:bg-gold-500" />

              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold-700/80 transition-colors duration-300 group-hover:text-gold-700">
                {service.audience}
              </p>
            </div>
          </m.a>
        ))}
      </m.div>
    </SectionWrapper>
  );
}
