import { Suspense } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import {
  CONTACT,
  COMPLIANCE,
  COMPANIES,
  SOCIAL_LINKS,
} from "@/lib/constants";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://prashannasangroula.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Prashanna Sangroula",
      jobTitle: ["Mortgage Loan Officer", "Realtor"],
      telephone: [CONTACT.phoneHref, CONTACT.realEstatePhoneHref],
      email: [CONTACT.email, CONTACT.realEstateEmail],
      url: BASE_URL,
      image: `${BASE_URL}/headshot.jpg`,
      sameAs: [
        SOCIAL_LINKS.facebook,
        SOCIAL_LINKS.instagram,
        SOCIAL_LINKS.linkedin,
      ],
      worksFor: [
        { "@type": "Organization", name: COMPANIES.loanFactory.name },
        { "@type": "Organization", name: COMPANIES.onest.name },
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Mortgage Loan Originator License",
          name: COMPLIANCE.personalNmls,
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Real Estate License",
          name: COMPLIANCE.realEstateLicense,
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: COMPANIES.loanFactory.name,
      telephone: CONTACT.phoneHref,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "9697 Main St",
        addressLocality: "Fairfax",
        addressRegion: "VA",
        postalCode: "22031",
        addressCountry: "US",
      },
      areaServed: [
        "VA",
        "DC",
        "FL",
        "GA",
        "KY",
        "MA",
        "MD",
        "NC",
        "NH",
        "OH",
        "PA",
        "WA",
      ],
      employee: { "@id": `${BASE_URL}/#person` },
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${BASE_URL}/#realestateagent`,
      name: "Prashanna Sangroula",
      telephone: CONTACT.realEstatePhoneHref,
      email: CONTACT.realEstateEmail,
      worksFor: { "@type": "Organization", name: COMPANIES.onest.name },
      areaServed: { "@type": "State", name: "Virginia" },
    },
  ],
};

// Static constants only -- safe to serialize directly per Next.js JSON-LD docs
const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
      />
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
