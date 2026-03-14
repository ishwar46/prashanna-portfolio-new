import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SECTION_IDS, COMPANIES } from "@/lib/constants";

const STATS = [
  { value: "12", label: "States Licensed" },
  { value: "246+", label: "Lenders" },
  { value: "4", label: "Languages" },
] as const;

export function AboutSection() {
  return (
    <SectionWrapper id={SECTION_IDS.about}>
      {/* Section header */}
      <div className="text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-800">
          Who I Am
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          About Prashanna
        </h2>
      </div>

      <AnimatedSection className="mt-8 sm:mt-12 md:grid md:grid-cols-12 md:gap-10 lg:gap-14">
        {/* Left column — Photo + Stats card */}
        <div className="flex flex-col items-center md:col-span-5 md:items-start">
          <div className="relative w-full max-w-xs md:max-w-none">
            <Image
              src="/images/prashanna_new.webp"
              alt="Prashanna Sangroula"
              width={400}
              height={480}
              className="relative z-10 mx-auto h-64 w-52 rounded-2xl object-cover object-top shadow-xl ring-1 ring-border sm:h-80 sm:w-64 md:mx-0 md:h-[340px] md:w-full lg:h-[380px]"
            />

            {/* Stats card — overlaps bottom of photo */}
            <div className="relative z-20 -mt-10 mx-4 rounded-xl bg-navy-900 p-4 shadow-lg sm:mx-8 sm:p-5 md:mx-0 md:-mt-14">
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, oklch(0.72 0.15 70) 1px, transparent 1px), linear-gradient(-45deg, oklch(0.72 0.15 70) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative flex justify-around text-center">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-3 sm:gap-4">
                    {i > 0 && <div className="h-8 w-px bg-navy-700" />}
                    <div>
                      <div className="text-2xl font-bold text-gold-400 sm:text-3xl">
                        {stat.value}
                      </div>
                      <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-navy-400 sm:text-xs">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dual role badges below stats */}
            <div className="mt-4 flex flex-col gap-2 px-4 sm:px-8 md:px-0">
              <div className="rounded-lg bg-card px-4 py-2.5 ring-1 ring-border">
                <p className="text-xs font-semibold text-foreground">
                  {COMPANIES.loanFactory.role}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {COMPANIES.loanFactory.name}
                </p>
              </div>
              <div className="rounded-lg bg-card px-4 py-2.5 ring-1 ring-border">
                <p className="text-xs font-semibold text-foreground">
                  {COMPANIES.onest.role}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {COMPANIES.onest.name} &middot; {COMPANIES.onest.office}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — Bio text */}
        <div className="mt-8 md:col-span-7 md:mt-0 md:flex md:flex-col md:justify-center">
          <div className="space-y-5">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Helping people achieve homeownership is more than a career for
              me&mdash;it&apos;s a calling. As a{" "}
              <span className="font-medium text-foreground">
                Mortgage Loan Officer
              </span>{" "}
              at Loan Factory, Inc. and a{" "}
              <span className="font-medium text-foreground">
                licensed Realtor
              </span>{" "}
              with oNest Real Estate in Fairfax, VA, I offer something
              rare&mdash;one professional who handles both your home search and
              your financing.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Licensed in{" "}
              <span className="font-medium text-foreground">
                twelve states
              </span>
              &mdash;Virginia, DC, Florida, Georgia, Kentucky, Massachusetts,
              Maryland, North Carolina, New Hampshire, Ohio, Pennsylvania, and
              Washington&mdash;with access to{" "}
              <span className="font-medium text-foreground">
                246+ lenders
              </span>{" "}
              through Loan Factory&apos;s platform, I find the best rates and
              terms across a massive network.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Fluent in{" "}
              <span className="font-medium text-foreground">
                English, Hindi, Nepali, and Urdu
              </span>
              , I&apos;m dedicated to supporting our diverse community. Whether
              you&apos;re buying your first home, investing in property, or
              refinancing&mdash;I coordinate the entire process from house
              hunting to closing day.
            </p>
          </div>

          <div className="mt-6 h-px w-12 bg-gold-500/60 sm:mt-8" />
          <a
            href="#contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-800 sm:mt-6"
          >
            Work with me
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
            >
              <path d="M3.5 8h9M8.5 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
