import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS, SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <SectionWrapper id={SECTION_IDS.services} alternate>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Loan Programs
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Explore the right financing option for your situation
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <a
            key={service.slug}
            href="#contact"
            data-service={service.slug}
            className="group block rounded-xl border border-border border-t-4 border-t-gold-500 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-gold-700">
              {service.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            <p className="mt-3 text-sm font-medium text-gold-700">
              Best for: {service.audience}
            </p>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
