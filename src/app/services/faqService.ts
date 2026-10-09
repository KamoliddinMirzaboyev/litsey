import { FAQItem, FAQTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const faqService = {
  async getFAQs(): Promise<FAQItem[]> {
    const response = await fetch(`${API_BASE_URL}/faqs/`);
    if (!response.ok) {
      throw new Error('Failed to fetch FAQs');
    }
    return response.json();
  },

  getTranslation(faq: FAQItem, lang: string): FAQTranslation {
    const translations = faq?.translations || ({} as any);
    const fallback: FAQTranslation = { question: '', answer: '' };
    
    // Map i18n codes to API codes
    if (lang === 'kr' || lang === 'uz_cyrl') {
      return translations.uz_cyrl || translations.uz || fallback;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz || fallback;
  }
};
