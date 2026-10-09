import { Department } from '../types';

import { API_BASE_URL } from '../../config/api';

export const departmentService = {
  async getAllDepartments(): Promise<Department[]> {
    const response = await fetch(`${API_BASE_URL}/departments/`);
    if (!response.ok) {
      throw new Error('Failed to fetch departments');
    }
    return response.json();
  },

  async getDepartmentBySlug(slug: string): Promise<Department> {
    const response = await fetch(`${API_BASE_URL}/departments/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch department detail');
    }
    return response.json();
  },

  getTranslation(department: Department, lang: string) {
    const translations = department?.translations || ({} as any);
    const fallback = { name: '', description: '' };
    
    // Map i18n codes to API codes
    if (lang === 'kr' || lang === 'uz_cyrl') {
      return translations.uz_cyrl || translations.uz || fallback;
    }
    
    return (translations as any)[lang] || translations.uz || fallback;
  }
};
