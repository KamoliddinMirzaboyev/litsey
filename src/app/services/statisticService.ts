import { StatItem, StatTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const statisticService = {
  async getStatistics(): Promise<StatItem[]> {
    const response = await fetch(`${API_BASE_URL}/statistics/`);
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    return response.json();
  },

  getTranslation(stat: StatItem, lang: string): StatTranslation {
    const translations = stat?.translations || ({} as any);
    const fallback: StatTranslation = { title: '' };
    
    // Map i18n codes to API codes
    if (lang === 'kr' || lang === 'uz_cyrl') {
      return translations.uz_cyrl || translations.uz || fallback;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz || fallback;
  }
};
