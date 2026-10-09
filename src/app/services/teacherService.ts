import { TeacherResponse, Teacher, TeacherTranslation } from '../types';

import { API_BASE_URL } from '../../config/api';

export const teacherService = {
  async getAllTeachers(page = 1): Promise<TeacherResponse> {
    const response = await fetch(`${API_BASE_URL}/teachers/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }
    return response.json();
  },

  async getTeacherBySlug(slug: string): Promise<Teacher> {
    const response = await fetch(`${API_BASE_URL}/teachers/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch teacher detail');
    }
    return response.json();
  },

  getTranslation(teacher: Teacher, lang: string): TeacherTranslation {
    const translations = teacher?.translations || ({} as any);
    const fallback: TeacherTranslation = { full_name: teacher?.full_name || '', position: '', bio: '', education: '', achievements: '' };
    if (lang === 'kr' || lang === 'uz_cyrl') {
      return translations.uz_cyrl || translations.uz || fallback;
    }
    return (translations as any)[lang] || translations.uz || fallback;
  }
};
