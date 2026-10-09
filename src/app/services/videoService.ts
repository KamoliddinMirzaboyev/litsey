import { Video, VideoTranslation, VideoResponse } from '../types';

import { API_BASE_URL } from '../../config/api';

export const videoService = {
  async getVideos(): Promise<VideoResponse> {
    const response = await fetch(`${API_BASE_URL}/videos/`);
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    return response.json();
  },

  getTranslation(video: Video, lang: string): VideoTranslation {
    const translations = video?.translations || ({} as any);
    const fallback: VideoTranslation = { title: '', description: '' };

    if (lang === 'kr' || lang === 'uz_cyrl') {
      return translations.uz_cyrl || translations.uz || fallback;
    }

    return (translations as any)[lang] || translations.uz || fallback;
  },
};

