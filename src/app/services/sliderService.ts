import { SliderItem, SliderTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const sliderService = {
  async getSliders(): Promise<SliderItem[]> {
    const response = await fetch(`${API_BASE_URL}/sliders/`);
    if (!response.ok) {
      throw new Error('Failed to fetch sliders');
    }
    return response.json();
  },

  getTranslation(slider: SliderItem, lang: string): SliderTranslation {
    const { translations } = slider;
    
    // Map i18n codes to API codes
    if (lang === 'kr') {
      return translations.uz_cyrl || translations.uz;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz;
  }
};
