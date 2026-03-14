import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const STATS = [
  { value: "12", label: "States Licensed" },
  { value: "11", label: "Loan Programs" },
  { value: "4", label: "Languages" },
] as const;

export function AboutSection() {
  return (
    <SectionWrapper id={SECTION_IDS.about}>
      {/* Section header */}
      <div className="text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          Who I Am
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          About Prashanna
        </h2>
      </div>

      <div className="mt-8 sm:mt-12 md:grid md:grid-cols-12 md:gap-10 lg:gap-14">
        {/* Left column — Photo + Stats card */}
        <div className="flex flex-col items-center md:col-span-5 md:items-start">
          {/* Photo with overlapping stats card */}
          <div className="relative w-full max-w-xs md:max-w-none">
            <Image
              src="/images/prashanna.png"
              alt="Prashanna Sangroula"
              width={400}
              height={480}
              className="relative z-10 mx-auto h-64 w-52 rounded-2xl object-cover object-top shadow-xl ring-1 ring-border sm:h-80 sm:w-64 md:mx-0 md:h-[340px] md:w-full lg:h-[380px]"
            />

            {/* Stats card — overlaps bottom of photo */}
            <div className="relative z-20 -mt-10 mx-4 rounded-xl bg-navy-900 p-4 shadow-lg sm:mx-8 sm:p-5 md:mx-0 md:-mt-14">
              {/* Subtle line pattern */}
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
                    {i > 0 && (
                      <div className="h-8 w-px bg-navy-700" />
                    )}
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
          </div>
        </div>

        {/* Right column — Bio text */}
        <div className="mt-8 md:col-span-7 md:mt-0 md:flex md:flex-col md:justify-center">
          <div className="space-y-5">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Helping people achieve homeownership is more than a career for
              me&mdash;it&apos;s a calling. As a Loan Officer at Loan Factory,
              Inc.&apos;s{" "}
              <span className="font-medium text-foreground">
                VA-Fairfax branch
              </span>
              , I&apos;m committed to personalized service and passionate about
              guiding clients through the biggest financial decision of their
              lives.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Licensed in{" "}
              <span className="font-medium text-foreground">
                twelve states
              </span>
              &mdash;Virginia, DC, Florida, Georgia, Kentucky, Massachusetts,
              Maryland, North Carolina, New Hampshire, Ohio, Pennsylvania, and
              Washington&mdash;I offer broad expertise and flexibility to serve
              clients across the country.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
              Fluent in{" "}
              <span className="font-medium text-foreground">
                English, Hindi, Nepali, and Urdu
              </span>
              , I&apos;m dedicated to supporting our diverse community. Through
              our company, I can also assist with real estate services in
              Virginia, ensuring a seamless experience for clients seeking both
              mortgage and real estate guidance.
            </p>
          </div>

          {/* Gold divider + CTA */}
          <div className="mt-6 h-px w-12 bg-gold-500/60 sm:mt-8" />
          <a
            href="#contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-600 sm:mt-6"
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
      </div>
    </SectionWrapper>
  );
}
