import { NewsResponse, NewsItem, NewsTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const newsService = {
  async getAllNews(page = 1): Promise<NewsResponse> {
    const response = await fetch(`${API_BASE_URL}/news/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return response.json();
  },

  async getNewsBySlug(slug: string): Promise<NewsItem> {
    const response = await fetch(`${API_BASE_URL}/news/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch news detail');
    }
    return response.json();
  },

  getTranslation(news: NewsItem, lang: string): NewsTranslation {
    const translations = news?.translations || ({} as any);
    const fallback: NewsTranslation = { title: '', content: '', short_description: '' };
    
    // Map i18n codes to API codes
    if (lang === 'kr' || lang === 'uz_cyrl') {
      return translations.uz_cyrl || translations.uz || fallback;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz || fallback;
  }
};
