import { AlbumResponse, Album } from '../types';

import { API_BASE_URL } from '../../config/api';

export const galleryService = {
  async getAllAlbums(page = 1): Promise<AlbumResponse> {
    const response = await fetch(`${API_BASE_URL}/gallery/albums/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }
    return response.json();
  },

  async getAlbumBySlug(slug: string): Promise<Album> {
    const response = await fetch(`${API_BASE_URL}/gallery/albums/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch album detail');
    }
    return response.json();
  },

  getTranslation(album: Album, lang: string) {
    const translations = album?.translations || ({} as any);
    const fallback = { title: '', description: '' };
    
    // Map i18n codes to API codes
    if (lang === 'kr' || lang === 'uz_cyrl') {
      return translations.uz_cyrl || translations.uz || fallback;
    }
    
    return (translations as any)[lang] || translations.uz || fallback;
  }
};
