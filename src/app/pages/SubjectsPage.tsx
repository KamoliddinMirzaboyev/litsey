import { Calculator, FlaskConical, Globe, Cpu, Microscope, Zap, Book, PenTool, Loader2, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { admissionService } from '../services/admissionService';
import { Subject } from '../types';

export function SubjectsPage() {
  const { t, i18n } = useTranslation();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await admissionService.getSubjects();
        const list: Subject[] = Array.isArray(data) ? data : ((data as any)?.results || []);
        // Sort by sort_order
        const sortedSubjects = [...list].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        setSubjects(sortedSubjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const getSubjectIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('matematika')) return Calculator;
    if (n.includes('fizika')) return Zap;
    if (n.includes('kimyo')) return FlaskConical;
    if (n.includes('ingliz')) return Globe;
    if (n.includes('informatika') || n.includes('it')) return Cpu;
    if (n.includes('biologiya')) return Microscope;
    if (n.includes('tarix')) return Book;
    if (n.includes('ona tili') || n.includes('adabiyot')) return PenTool;
    return Award;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-12 h-12 text-[#0d89b1] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0d89b1] to-[#0a6d8f] text-white py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase">{t('nav.subjects')}</h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed font-bold opacity-90 uppercase tracking-widest">
              {t('subjects.pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Subjects Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subjects.map((subject, index) => {
              const translation = admissionService.getTranslation(subject, i18n.language);
              const Icon = getSubjectIcon(translation.subject_name);
              
              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all group"
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-[#0d89b1]/10 rounded-xl flex items-center justify-center group-hover:bg-[#0d89b1] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-inner">
                      <Icon size={32} className="text-[#0d89b1] group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight group-hover:text-[#0d89b1] transition-colors">
                        {translation.subject_name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        <span>{subject.subject_type_display}:</span>
                        <span className="text-[#0d89b1]">{subject.max_score} {t('subjects.maxScore', 'ball')}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {translation.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
