import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS, SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <SectionWrapper id={SECTION_IDS.services} alternate>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          What I Offer
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          Loan Programs
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Explore the right financing option for your situation
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <a
            key={service.slug}
            href={`?service=${service.slug}#contact`}
            data-service={service.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-card p-5 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/5 hover:ring-gold-500/40 sm:p-6"
          >
            {/* Number accent */}
            <span className="absolute -right-2 -top-3 text-7xl font-black leading-none text-navy-900/[0.04] transition-colors duration-300 group-hover:text-gold-500/10 sm:text-8xl">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Content */}
            <div className="relative">
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
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
