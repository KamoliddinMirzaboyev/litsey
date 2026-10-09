export interface SiteTranslations {
  short_name: string;
  full_name: string;
  address: string;
}

export interface SiteSettings {
  id: number;
  translations: {
    uz: SiteTranslations;
    ru: SiteTranslations;
  };
  established_year: number;
  phone: string;
  email: string;
  website: string;
  logo: string;
  telegram: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
}

import { API_BASE_URL } from '../../config/api';

export const settingsService = {
  async getSettings(): Promise<SiteSettings | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/`);
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  },

  getTranslation(settings: SiteSettings | null, lang: string): SiteTranslations {
    if (!settings) {
      return {
        short_name: lang === 'ru' ? '1-й АЛ при ФГТУ' : 'FDTU 1-son AL',
        full_name: lang === 'ru' 
          ? 'Академический лицей №1 при Ферганском государственном техническом университете' 
          : "Farg'ona politexnika instituti qoshidagi 1-son akademik litsey",
        address: lang === 'ru'
          ? 'г. Фергана, массив Ёрмазор, ул. Мураббийлар, 19'
          : "Farg'ona shahri, Yormozor hududi, Murabbiylar ko'chasi, 19-uy"
      };
    }

    // Map kr to uz since API doesn't have kr translations
    const apiLang = lang === 'kr' ? 'uz' : lang;
    return settings.translations[apiLang as keyof typeof settings.translations] || settings.translations.uz;
  },

  getSocialLinks(settings: SiteSettings | null) {
    const admissionChannel = 'https://t.me/fdtu1alqabul';
    const instagramOfficial = 'https://www.instagram.com/fdtu1al.uz?igsh=MWJuMTJtZ28zOTlxMg==';

    if (!settings) {
      return {
        telegram: 'https://t.me/fdtu1al_uz',
        instagram: instagramOfficial,
        facebook: null,
        youtube: 'https://youtube.com',
        telegramAdmission: admissionChannel
      };
    }

    return {
      telegram: settings.telegram || 'https://t.me/fdtu1al_uz',
      instagram: settings.instagram || instagramOfficial,
      facebook: null, // Facebook olib tashlandi (ishlatilmaydi)
      youtube: settings.youtube || 'https://youtube.com',
      telegramAdmission: admissionChannel
    };
  },

  getContactInfo(settings: SiteSettings | null) {
    if (!settings) {
      return {
        phone: '+998 73 244 55 66',
        email: 'info@fdtual.uz',
        website: 'https://fdtual.uz',
        established_year: 2000
      };
    }

    return {
      phone: settings.phone || '+998 73 244 55 66',
      email: settings.email || 'info@fdtual.uz',
      website: settings.website || 'https://fdtual.uz',
      established_year: settings.established_year || 2000,
      logo: settings.logo || '/logoicon.png'
    };
  }
};

// Default settings for fallback
export const defaultSettings: SiteSettings = {
  id: 1,
  translations: {
    uz: {
      short_name: "FDTU 1-son AL",
      full_name: "Farg'ona politexnika instituti qoshidagi 1-son akademik litsey",
      address: "Farg'ona shahri, Yormozor hududi, Murabbiylar ko'chasi, 19-uy"
    },
    ru: {
      short_name: "1-й АЛ при ФГТУ",
      full_name: "Академический лицей №1 при Ферганском государственном техническом университете",
      address: "г. Фергана, массив Ёрмазор, ул. Мураббийлар, 19"
    }
  },
  established_year: 2000,
  phone: "+998 73 244 55 66",
  email: "info@fdtual.uz",
  website: "https://fdtual.uz",
  logo: "/logoicon.png",
  telegram: null,
  instagram: null,
  facebook: null,
  youtube: null
};
