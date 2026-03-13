import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

export function HeroSection() {
  return (
    <SectionWrapper
      id={SECTION_IDS.hero}
      className="bg-linear-to-br from-navy-900 via-navy-800 to-navy-950 pt-20"
    >
      <div className="flex min-h-[calc(100svh-5rem)] flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Your Home Journey Starts Here
          </h1>
          <p className="mt-4 text-lg text-navy-200 md:text-xl">
            Expert mortgage guidance tailored to your goals. From first-time
            buyers to seasoned investors, I&apos;ll find the right loan for you.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-gold-500 px-8 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Get a Free Consultation
          </a>
        </div>
        <div className="shrink-0 flex items-center justify-center">
          <Image
            src="/images/prashanna.png"
            alt="Prashanna Sangroula — Mortgage Loan Officer"
            width={320}
            height={320}
            priority
            className="size-56 rounded-full border-4 border-gold-500/30 object-cover md:size-72 lg:size-80"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
