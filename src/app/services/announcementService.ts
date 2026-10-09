import { AnnouncementResponse, Announcement, AnnouncementTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const announcementService = {
  async getAllAnnouncements(page = 1): Promise<AnnouncementResponse> {
    const response = await fetch(`${API_BASE_URL}/announcements/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }
    return response.json();
  },

  async getAnnouncementBySlug(slug: string): Promise<Announcement> {
    const response = await fetch(`${API_BASE_URL}/announcements/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch announcement detail');
    }
    return response.json();
  },

  getTranslation(announcement: Announcement, lang: string): AnnouncementTranslation {
    const translations = announcement?.translations || ({} as any);
    const fallback: AnnouncementTranslation = { title: '', content: '', short_description: '' };
    
    // Map i18n codes to API codes
    if (lang === 'kr' || lang === 'uz_cyrl') {
      return (translations as any).uz_cyrl || translations.uz || fallback;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz || fallback;
  }
};
