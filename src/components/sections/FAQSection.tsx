import { SectionWrapper } from "@/components/layout/SectionWrapper";
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
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Common questions about the mortgage process
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-2xl sm:mt-12">
        <Accordion defaultValue={[]}>
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={index}>
              <AccordionTrigger className="text-sm text-foreground sm:text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
