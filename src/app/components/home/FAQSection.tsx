import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { faqService } from '../../services/faqService';
import { FAQItem } from '../../types';
import { Loader2, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const { t, i18n } = useTranslation();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await faqService.getFAQs();
        const list: FAQItem[] = Array.isArray(data) ? data : ((data as any)?.results || []);
        // Filter active FAQs and sort by sort_order
        const activeFaqs = list
          .filter(faq => faq.is_active)
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        setFaqs(activeFaqs);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-[#0d89b1] animate-spin" />
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#0d89b1]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#0d89b1]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full text-xs font-black mb-6 uppercase tracking-[0.3em]">
            <HelpCircle size={14} />
            {t('faq.badge', 'Ko\'p beriladigan savollar')}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight uppercase tracking-tight">
            {t('faq.title', 'Savollaringiz bormi?')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-widest opacity-80">
            {t('faq.subtitle', 'Biz sizga yordam berishga tayyormiz')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
            {faqs.map((faq, index) => {
              const translation = faqService.getTranslation(faq, i18n.language);
              return (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl md:rounded-3xl border-none px-5 md:px-12 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-black text-gray-900 dark:text-white hover:text-[#0d89b1] dark:hover:text-[#0d89b1] py-6 md:py-8 text-lg md:text-2xl leading-snug uppercase tracking-tight hover:no-underline border-none">
                    <span className="flex items-start gap-3 md:gap-4">
                      <span className="text-[#0d89b1]/20 group-hover:text-[#0d89b1] transition-colors duration-300 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-grow">{translation.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pb-6 md:pb-10 text-base md:text-xl font-medium border-t border-gray-100 dark:border-gray-800 pt-5 md:pt-6">
                    {translation.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
