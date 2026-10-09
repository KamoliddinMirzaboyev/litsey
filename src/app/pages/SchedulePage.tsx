import { Download, FileText, Loader2, Home, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { scheduleService, ScheduleItem } from '../services/scheduleService';
import { admissionService } from '../services/admissionService';
import { AdmissionDocument } from '../types';
import { Link } from 'react-router';

export function SchedulePage() {
  const { t, i18n } = useTranslation();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [fallbackDocs, setFallbackDocs] = useState<AdmissionDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schedData = await scheduleService.getSchedules();
        if (schedData && schedData.length > 0) {
          setSchedules(schedData);
        } else {
          // Fallback to admission documents if no timetable items exist yet
          const docs = await admissionService.getAdmissionDocuments().catch(() => []);
          setFallbackDocs(docs);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-12 h-12 text-[#0d89b1] animate-spin" />
      </div>
    );
  }

  const hasSchedules = schedules.length > 0;
  const hasFallback = fallbackDocs.length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link to="/" className="text-gray-500 hover:text-[#0d89b1] transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>{t('nav.home')}</span>
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 dark:text-white font-bold">{t('nav.schedule')}</span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="py-12 md:py-16 text-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight"
          >
            {t('nav.schedule')}
          </motion.h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2 font-medium">
            {t('schedule.pageSubtitle', "Litsey guruhlari va kurslari uchun dars jadvallari")}
          </p>
        </div>
      </div>

      {/* Schedule List */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {hasSchedules ? (
              schedules.map((item, index) => {
                const trans = scheduleService.getTranslation(item, i18n.language);
                const fileUrl = scheduleService.getFileUrl(item.file);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#0d89b1]/10 text-[#0d89b1] rounded-lg group-hover:bg-[#0d89b1] group-hover:text-white transition-colors">
                          <FileText size={24} />
                        </div>
                        <div>
                          <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            {trans.title || "Dars jadvali"}
                          </span>
                          <p className="text-xs text-gray-400 mt-0.5 font-medium">
                            PDF formatda yuklab olish
                          </p>
                        </div>
                      </div>
                      <div className="p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm group-hover:bg-[#0d89b1] group-hover:text-white transition-colors">
                        <Download size={20} className="text-gray-400 group-hover:text-white" />
                      </div>
                    </a>
                  </motion.div>
                );
              })
            ) : hasFallback ? (
              fallbackDocs.map((doc, index) => {
                const trans = admissionService.getTranslation(doc, i18n.language);
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={doc.document_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
                    >
                      <div className="flex-1">
                        <span className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                          {trans.document_name}
                        </span>
                        {trans.note && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                            {trans.note}
                          </p>
                        )}
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm group-hover:bg-[#0d89b1] group-hover:text-white transition-colors">
                        <Download size={20} className="text-gray-400 group-hover:text-white" />
                      </div>
                    </a>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Hozircha dars jadvali yuklanmagan.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
