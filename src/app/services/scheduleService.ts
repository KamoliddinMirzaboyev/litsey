import { API_BASE_URL, getImageUrl } from '../../config/api';

export interface ScheduleItem {
  id: number;
  translations: {
    uz: { title: string };
    ru?: { title: string };
    en?: { title: string };
    uz_cyrl?: { title: string };
    [key: string]: { title: string } | undefined;
  };
  file: string;
  sort_order: number;
  is_active: boolean;
}

export const scheduleService = {
  async getSchedules(): Promise<ScheduleItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dars-jadvali/`);
      if (!response.ok) {
        throw new Error('Failed to fetch schedule');
      }
      const data = await response.json();
      const list: ScheduleItem[] = Array.isArray(data) ? data : data.results || [];
      return list
        .filter((item) => item.is_active !== false)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    } catch (e) {
      console.warn('Dars jadvalini olishda xatolik:', e);
      return [];
    }
  },

  getTranslation(item: ScheduleItem, lang: string): { title: string } {
    const t = item.translations || ({} as any);
    if (lang === 'kr' || lang === 'uz-cyrl') {
      return t.uz_cyrl || t.uz || { title: '' };
    }
    return t[lang] || t.uz || { title: '' };
  },

  getFileUrl(path: string | null): string {
    return getImageUrl(path);
  },
};
