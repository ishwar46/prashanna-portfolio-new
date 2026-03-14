import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS, SECTION_IDS } from "@/lib/constants";

export function FAQSection() {
  return (
    <SectionWrapper id={SECTION_IDS.faq} alternate>
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          Answers
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Common questions about the mortgage process
        </p>
      </div>

      <AnimatedSection className="mx-auto mt-8 max-w-2xl sm:mt-12">
        <div className="space-y-3">
          <Accordion defaultValue={[]}>
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={index}
                className="group/faq overflow-hidden rounded-xl border-none bg-card px-5 ring-1 ring-border transition-all duration-200 hover:ring-gold-500/30 sm:px-6 [&[data-open]]:ring-gold-500/40 [&[data-open]]:shadow-sm not-last:mb-3"
              >
                <AccordionTrigger className="py-4 text-sm font-semibold text-foreground hover:no-underline sm:text-base">
                  <span className="mr-4 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-navy-900/5 text-[10px] font-bold text-navy-600 sm:h-7 sm:w-7 sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-sm leading-relaxed text-muted-foreground sm:pl-11 sm:text-base sm:leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
