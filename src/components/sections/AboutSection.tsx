import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const STATS = [
  { value: "11", label: "Loan Programs" },
  { value: "500+", label: "Families Helped" },
  { value: "100%", label: "Client Focus" },
] as const;

export function AboutSection() {
  return (
    <SectionWrapper id={SECTION_IDS.about}>
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-16">
        <div className="shrink-0">
          <div className="flex size-48 items-center justify-center rounded-full bg-navy-100 text-4xl font-bold text-navy-700 md:size-64">
            PS
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            About Prashanna
          </h2>
          <div className="mt-4 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Helping people achieve homeownership is more than a career for
              me&mdash;it&apos;s a calling. I got into mortgage lending because I
              believe everyone deserves a knowledgeable guide by their side when
              making the biggest financial decision of their life.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              At Loan Factory, Inc., I work with a wide range of loan programs
              &mdash;from conventional and FHA to specialized options like DSCR
              investor loans, bank statement programs, and foreign national
              financing. Whether you&apos;re a first-time buyer, a veteran, or a
              seasoned investor, I tailor every solution to fit your unique
              situation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I believe in transparency, education, and putting your needs first.
              My goal is to make the mortgage process clear and stress-free so you
              can focus on what matters most&mdash;finding the right home for you
              and your family.
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
