import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Can I bring a plus one?", a: "Please refer to your invitation for details on your plus one. If you have questions, reach out to us directly." },
  { q: "Are children welcome?", a: "We love your little ones! However, this will be an adults-only celebration. We hope you understand." },
  { q: "What should I wear?", a: "Smart casual with a beach twist. Think linen and light fabrics. Comfortable shoes are a must for the sandy terrain." },
  { q: "Is there parking at the venue?", a: "Yes, there will be parking available. We'll share detailed directions closer to the date." },
  { q: "When should I RSVP by?", a: "Please RSVP by July 1st, 2026 so we can finalize all the arrangements." },
  { q: "Can I take photos during the ceremony?", a: "We kindly ask for an unplugged ceremony. Our photographer will capture every moment. Feel free to snap away at the reception!" },
];

export const FaqSection = () => (
  <section id="faq" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[hsl(205_40%_72%)]">
      <p className="font-body text-sm tracking-[0.3em] uppercase text-foreground/60 mb-4">Questions</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-16">FAQ</h1>

      <div className="max-w-2xl w-full animate-fade-in">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-foreground/10">
              <AccordionTrigger className="font-display text-lg text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-foreground/70 leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
);

const Faq = () => (
  <PageLayout>
    <FaqSection />
  </PageLayout>
);

export default Faq;
