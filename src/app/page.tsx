import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SECTION_IDS } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />

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
