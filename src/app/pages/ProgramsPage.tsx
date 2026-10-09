import { GraduationCap, Target, BookOpen, FlaskConical, Globe, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function ProgramsPage() {
  const { t } = useTranslation();

  const programs = [
    {
      icon: GraduationCap,
      title: t('programs.exactSciences.title'),
      description: t('programs.exactSciences.desc'),
    },
    {
      icon: FlaskConical,
      title: t('programs.naturalSciences.title'),
      description: t('programs.naturalSciences.desc'),
    },
    {
      icon: Globe,
      title: t('programs.foreignLanguages.title'),
      description: t('programs.foreignLanguages.desc'),
    },
    {
      icon: BookOpen,
      title: t('programs.socialHumanities.title'),
      description: t('programs.socialHumanities.desc'),
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
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase">{t('nav.programs')}</h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed font-bold opacity-90 uppercase tracking-widest">
              {t('programs.pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Programs Content */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-950 rounded-2xl p-10 shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all group"
                >
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="w-20 h-20 bg-[#0d89b1]/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#0d89b1] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-inner">
                      <Icon size={40} className="text-[#0d89b1] group-hover:text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-[#0d89b1] transition-colors">
                        {program.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
