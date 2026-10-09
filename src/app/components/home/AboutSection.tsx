import { CheckCircle, Award, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export function AboutSection() {
  const { t } = useTranslation();
  const features = [
    {
      icon: Award,
      title: t('home.features.quality'),
      description: t('home.features.qualityDesc'),
    },
    {
      icon: Users,
      title: t('home.features.teachers'),
      description: t('home.features.teachersDesc'),
    },
    {
      icon: BookOpen,
      title: t('home.features.subjects'),
      description: t('home.features.subjectsDesc'),
    },
    {
      icon: CheckCircle,
      title: t('home.features.result'),
      description: t('home.features.resultDesc'),
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative" data-aos="fade-right">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/litsey_bino.jpg"
                alt={t('nav.about')}
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#0d89b1] rounded-lg flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800">
              <div className="text-center text-white">
                <div className="text-5xl font-black mb-2 tracking-tighter">26+</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] opacity-80">{t('home.yearsExperience', 'Yillik tajriba')}</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div data-aos="fade-left">
            <div className="inline-block px-5 py-2 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full text-xs font-black mb-6 uppercase tracking-[0.2em]">
              {t('home.aboutTitle')}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
              {t('home.aboutSubtitle')}
            </h2>
            <div className="p-4 md:p-5 bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-[#0d89b1] rounded-r-xl mb-6 shadow-sm">
              <p className="text-xs font-black uppercase text-[#0d89b1] tracking-wider mb-1">
                {t('home.decreeTitle', 'Asos hujjat:')}
              </p>
              <p className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                {t('home.decreeText', 'Yormozor akademik litseyi O‘zbekiston Respublikasi Vazirlar Mahkamasining 1998-yil 24-fevraldagi 77-sonli “Akademik litseylar va kasb-hunar kollejlarini tashkil etish va ularning faoliyatini boshqarish to‘g‘risida”gi qaroriga asosan tashkil topgan.')}
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-base md:text-lg font-medium">
              {t('home.aboutDesc')}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-5 group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-white dark:bg-gray-800 shadow-lg group-hover:bg-[#0d89b1] group-hover:text-white rounded-md flex items-center justify-center transition-all duration-300 transform group-hover:rotate-6">
                        <Icon size={26} className="text-[#0d89b1] group-hover:text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white mb-1 uppercase tracking-wider text-sm">{feature.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#0d89b1] text-white rounded-lg hover:bg-[#0d89b1] transition-all duration-300 font-black uppercase tracking-widest shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              {t('home.readMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
