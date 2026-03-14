import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS, TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <SectionWrapper id={SECTION_IDS.testimonials} alternate>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          What Clients Say
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Hear from homeowners I&apos;ve helped
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.name}
            className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6"
          >
            <span className="font-serif text-3xl leading-none text-gold-500 sm:text-4xl">
              {"\u201C"}
            </span>
            <p className="mt-2 leading-relaxed text-foreground">
              {testimonial.quote}
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <p className="font-semibold text-foreground">
                {testimonial.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonial.context}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
