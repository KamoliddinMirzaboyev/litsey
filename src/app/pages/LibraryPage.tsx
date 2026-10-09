import { BookOpen, Search, Download, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function LibraryPage() {
  const { t } = useTranslation();

  const resources = [
    {
      title: "Matematika chuqurlashtirilgan to'garak qo'llanmasi",
      author: "M.Qo'shnazarova",
      category: t('library.manuals'),
      format: 'PDF',
    },
    {
      title: "O'zbek tili va adabiyotidan uslubiy qo'llanma",
      author: 'O.Shamsutdinova, N.Maqsudova',
      category: t('library.textbooks'),
      format: 'PDF',
    },
    {
      title: 'Ingliz tili: IELTS va CEFR tayyorgarlik kursi',
      author: 'F.Nishonova, S.Xudoyberganova',
      category: t('library.languages'),
      format: 'PDF',
    },
    {
      title: "Kimyo fanidan laboratoriya va amaliy mashg'ulotlar",
      author: 'D.Mamatova, S.Samijonov',
      category: t('library.practical'),
      format: 'PDF',
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0d89b1] to-[#0d89b1] text-white py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase">{t('nav.library')}</h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed font-bold opacity-90 uppercase tracking-widest">
              {t('library.pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Library Info */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { label: t('library.books'), value: '5000+' },
                { label: t('library.resources'), value: '500+' },
                { label: t('library.journals'), value: '50+' },
                { label: t('library.guides'), value: '100+' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-950 rounded-lg p-8 text-center shadow-lg border border-gray-100 dark:border-gray-800 group hover:-translate-y-1 transition-all">
                  <div className="text-4xl font-black text-[#0d89b1] mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-10 shadow-xl mb-12 border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tight">{t('library.searchTitle')}</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={t('library.searchPlaceholder')}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 dark:bg-gray-900 border-none rounded-lg focus:ring-2 focus:ring-[#0d89b1] outline-none text-gray-900 dark:text-white font-bold"
                  />
                </div>
                <button className="px-10 py-5 bg-[#0d89b1] text-white rounded-lg hover:bg-[#0d89b1] transition-all font-black uppercase tracking-widest shadow-lg">
                  {t('library.searchBtn')}
                </button>
              </div>
            </div>

            {/* Resources List */}
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="bg-gradient-to-r from-[#0d89b1] to-[#0d89b1] p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-md flex items-center justify-center">
                    <BookOpen size={28} />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{t('library.popularResources')}</h2>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {resources.map((resource, index) => (
                  <div key={index} className="p-8 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all group">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-[#0d89b1]/10 text-[#0d89b1] text-[10px] font-black uppercase tracking-widest rounded-full">
                            {resource.category}
                          </span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{resource.format}</span>
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight group-hover:text-[#0d89b1] transition-colors">{resource.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{t('library.author')}: {resource.author}</p>
                      </div>
                      <button className="flex items-center gap-3 px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-[#0d89b1] hover:text-white transition-all font-black uppercase tracking-widest text-xs">
                        <Download size={18} />
                        {t('library.download')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={40} className="text-[#0d89b1]" />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{t('library.hoursTitle')}</h3>
                <div className="grid grid-cols-2 gap-8 text-white/80 font-bold uppercase tracking-widest text-sm">
                  <div>
                    <div className="text-[#0d89b1] mb-1">DUSHANBA - JUMA</div>
                    <div>08:30 - 17:00</div>
                  </div>
                  <div>
                    <div className="text-[#0d89b1] mb-1">SHANBA</div>
                    <div>08:30 - 14:00</div>
                  </div>
                </div>
                <p className="mt-8 text-white/60 text-xs font-medium italic">
                  * {t('library.libraryNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
