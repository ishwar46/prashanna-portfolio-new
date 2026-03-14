import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

export function HeroSection() {
  return (
    <SectionWrapper
      id={SECTION_IDS.hero}
      className="bg-linear-to-br from-navy-900 via-navy-800 to-navy-950 pt-20"
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:min-h-[calc(100svh-5rem)] md:flex-row md:items-center md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Your Home Journey Starts Here
          </h1>
          <p className="mt-3 text-base text-navy-200 sm:mt-4 sm:text-lg md:text-xl">
            Expert mortgage guidance tailored to your goals. From first-time
            buyers to seasoned investors, I&apos;ll find the right loan for you.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex h-11 items-center rounded-lg bg-gold-500 px-6 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 sm:mt-8 sm:h-12 sm:px-8 sm:text-base"
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
            className="size-44 rounded-full border-4 border-gold-500/30 object-cover sm:size-56 md:size-72 lg:size-80"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
