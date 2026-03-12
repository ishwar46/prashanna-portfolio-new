import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <SectionWrapper id={SECTION_IDS.hero} className="pt-20">
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-muted-foreground">
              Hero Section
            </h2>
            <p className="mt-2 text-muted-foreground">Coming in Phase 2</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id={SECTION_IDS.services} alternate>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Services Section
          </h2>
          <p className="mt-2 text-muted-foreground">Coming in Phase 2</p>
        </div>
      </SectionWrapper>

      <SectionWrapper id={SECTION_IDS.about}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            About Section
          </h2>
          <p className="mt-2 text-muted-foreground">Coming in Phase 2</p>
        </div>
      </SectionWrapper>

      <SectionWrapper id={SECTION_IDS.testimonials} alternate>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Testimonials Section
          </h2>
          <p className="mt-2 text-muted-foreground">Coming in Phase 2</p>
        </div>
      </SectionWrapper>

      <SectionWrapper id={SECTION_IDS.calculator}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Calculator Section
          </h2>
          <p className="mt-2 text-muted-foreground">Coming in Phase 3</p>
        </div>
      </SectionWrapper>

      <SectionWrapper id={SECTION_IDS.faq} alternate>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            FAQ Section
          </h2>
          <p className="mt-2 text-muted-foreground">Coming in Phase 3</p>
        </div>
      </SectionWrapper>

      <SectionWrapper id={SECTION_IDS.contact}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Contact Section
          </h2>
          <p className="mt-2 text-muted-foreground">Coming in Phase 3</p>
        </div>
      </SectionWrapper>
    </>
  );
}
