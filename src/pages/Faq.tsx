import PageLayout from "@/components/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "@/i18n";

export const FaqSection = () => {
  const { t } = useTranslation();
  const faqRef = useScrollReveal<HTMLDivElement>(".faq-item");

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ];

  return (
    <section id="faq" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[hsl(220_55%_75%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
      <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">{t.faq.questions}</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-16">{t.faq.faq}</h1>

      <div ref={faqRef} className="max-w-4xl w-full">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="faq-item scroll-fade-up border-foreground/10" style={{ transitionDelay: `${(i + 1) * 0.1}s` }}>
              <AccordionTrigger className="font-display text-xl text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-base text-foreground/70 leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <p className="font-display text-2xl md:text-3xl italic text-foreground/80 mt-16">
        {t.faq.closing}
      </p>
    </section>
  );
};

const Faq = () => (
  <PageLayout>
    <FaqSection />
  </PageLayout>
);

export default Faq;
