import { Suspense } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <CalculatorSection />
      <FAQSection />
      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>
    </>
  );
}
