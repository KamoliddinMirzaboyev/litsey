import { LeadershipMember, LeadershipTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const leadershipService = {
  async getManagement(): Promise<LeadershipMember[]> {
    const response = await fetch(`${API_BASE_URL}/management/`);
    if (!response.ok) {
      throw new Error('Failed to fetch management data');
    }
    return response.json();
  },

  getTranslation(member: LeadershipMember, lang: string): LeadershipTranslation {
    const translations = member?.translations || ({} as any);
    const fallback: LeadershipTranslation = { full_name: member?.full_name || '', position: '', reception_hours: '', bio: '' };
    
    // Map i18n codes to API codes
    if (lang === 'kr' || lang === 'uz_cyrl') {
      return (translations as any).uz_cyrl || translations.uz || fallback;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz || fallback;
  }
};
