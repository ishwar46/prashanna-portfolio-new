import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const STATS = [
  { value: "12", label: "States Licensed" },
  { value: "11", label: "Loan Programs" },
  { value: "4", label: "Languages Spoken" },
] as const;

export function AboutSection() {
  return (
    <SectionWrapper id={SECTION_IDS.about}>
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-16">
        <div className="shrink-0">
          <Image
            src="/images/prashanna.png"
            alt="Prashanna Sangroula"
            width={256}
            height={256}
            className="size-48 rounded-full object-cover md:size-64"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            About Prashanna
          </h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Helping people achieve homeownership is more than a career for
              me&mdash;it&apos;s a calling. As a Loan Officer at Loan Factory,
              Inc.&apos;s VA-Fairfax branch, I&apos;m committed to personalized
              service and passionate about guiding clients through the biggest
              financial decision of their lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Licensed in twelve states&mdash;Virginia, DC, Florida, Georgia,
              Kentucky, Massachusetts, Maryland, North Carolina, New Hampshire,
              Ohio, Pennsylvania, and Washington&mdash;I offer broad expertise
              and flexibility to serve clients across the country. I work with a
              wide range of loan programs, from conventional and FHA to
              specialized options like DSCR investor loans, bank statement
              programs, and foreign national financing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Fluent in English, Hindi, Nepali, and Urdu, I&apos;m dedicated to
              supporting our diverse community. Through our company, I can also
              assist with real estate services in Virginia, ensuring a seamless
              experience for clients seeking both mortgage and real estate
              guidance.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-secondary px-6 py-4 text-center"
              >
                <div className="text-2xl font-bold text-navy-900">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
