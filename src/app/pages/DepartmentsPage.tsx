import { Mail, Phone, Loader2, Home, ChevronRight, Plus, Minus, User, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { departmentService } from '../services/departmentService';
import { Department } from '../types';

export function DepartmentsPage() {
  const { t, i18n } = useTranslation();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const currentLang = i18n.language || 'uz';

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await departmentService.getAllDepartments();
        const activeDepartments = data
          .filter(dept => dept.is_active)
          .sort((a, b) => a.sort_order - b.sort_order);
        setDepartments(activeDepartments);
        if (activeDepartments.length > 0) {
          setExpandedId(activeDepartments[0].id);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-12 h-12 text-[#0d89b1] animate-spin" />
      </div>
    );
  }

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
            <span className="text-gray-900 dark:text-white font-bold">{t('nav.departments')}</span>
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
            {t('nav.departments').toUpperCase()}
          </motion.h1>
        </div>
      </div>

      {/* Departments List */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-4">
            {departments.map((dept, index) => {
              const translation = departmentService.getTranslation(dept, currentLang);
              const isExpanded = expandedId === dept.id;
              
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`overflow-hidden rounded-xl transition-all duration-300 ${
                    isExpanded 
                      ? 'bg-gray-50 dark:bg-gray-900 shadow-md ring-1 ring-[#0d89b1]/20' 
                      : 'bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 hover:border-[#0d89b1]/30'
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : dept.id)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
                  >
                    <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${
                      isExpanded ? 'text-[#0d89b1]' : 'text-gray-900 dark:text-white'
                    }`}>
                      {translation.name}
                    </h3>
                    <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-0'}`}>
                      {isExpanded ? (
                        <Minus className="w-6 h-6 text-[#0d89b1]" />
                      ) : (
                        <Plus className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                  </button>

                  {/* Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 md:px-8 pb-8 pt-2">
                          {/* Subjects List */}
                          <div className="space-y-0 border-t border-gray-200 dark:border-gray-800">
                            {(dept.subjects || []).map((subject, idx) => (
                              <div 
                                key={idx}
                                className="py-4 border-b border-gray-100 dark:border-gray-800/50 text-gray-600 dark:text-gray-400 font-bold text-sm md:text-base hover:text-[#0d89b1] dark:hover:text-[#0d89b1] transition-colors pl-2"
                              >
                                {subject}
                              </div>
                            ))}
                          </div>

                          {/* Extra Info Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-6 bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-[#0d89b1]">
                                <User size={20} />
                              </div>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{t('departments.head')}</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{dept.head_teacher?.full_name || '-'}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-500">
                                <MapPin size={20} />
                              </div>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{t('departments.room')}</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{dept.room_number || '-'}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-lg flex items-center justify-center text-rose-500">
                                <Phone size={20} />
                              </div>
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{t('departments.phone')}</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{dept.phone || '-'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#0d89b1]"></div>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                              {translation.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
