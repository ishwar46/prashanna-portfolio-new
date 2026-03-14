import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SECTION_IDS, TESTIMONIALS, GOOGLE_REVIEWS_URL } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <SectionWrapper id={SECTION_IDS.testimonials} alternate>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          Client Stories
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          What Clients Say
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Hear from homeowners I&apos;ve helped
        </p>
      </div>

      <AnimatedSection className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.name}
            className="group relative overflow-hidden rounded-2xl bg-card p-5 ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/5 hover:ring-gold-500/40 sm:p-6"
          >
            {/* Large watermark quote */}
            <span className="pointer-events-none absolute -top-3 right-3 font-serif text-[7rem] leading-none text-navy-900/[0.04] transition-colors duration-300 group-hover:text-gold-500/[0.08] sm:text-[8rem]">
              {"\u201D"}
            </span>

            {/* Gold accent bar */}
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-linear-to-b from-gold-500/0 via-gold-500/50 to-gold-500/0 transition-opacity duration-300 group-hover:via-gold-500" />

            {/* Content */}
            <div className="relative">
              {/* Context tag */}
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-700">
                {testimonial.context}
              </span>

              {/* Quote */}
              <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="mt-5 flex items-center gap-3 sm:mt-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-xs font-bold text-navy-900 ring-1 ring-border sm:h-10 sm:w-10 sm:text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <div className="mt-0.5 h-px w-6 bg-gold-500/30" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </AnimatedSection>

      {/* View more link */}
      <div className="mt-8 text-center sm:mt-10">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-600"
        >
          View More Reviews on Google
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
          >
            <path d="M4 12L12 4M12 4H6M12 4v6" />
          </svg>
        </a>
      </div>
    </SectionWrapper>
  );
}
