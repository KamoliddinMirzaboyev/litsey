import { Home, ChevronRight, Play, X, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { videoService } from '../services/videoService';
import { Video } from '../types';
import { Skeleton } from '../components/ui/skeleton';

export function VideosPage() {
  const { t, i18n } = useTranslation();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await videoService.getVideos();
        const list: Video[] = Array.isArray(data) ? data : (data?.results || []);
        const activeVideos = list.filter((video) => video.is_active);
        const sortedVideos = [...activeVideos].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        setVideos(sortedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

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
            <span className="text-gray-900 dark:text-white font-bold">{t('nav.videos')}</span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="py-12 md:py-16 text-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight"
          >
            {t('nav.videos').toUpperCase()}
          </motion.h1>
        </div>
      </div>

      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid lg:grid-cols-2 gap-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
                  <Skeleton className="aspect-video w-full rounded-none" />
                  <div className="p-6 md:p-8">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-8 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Play className="text-[#0d89b1] w-10 h-10 ml-1" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
                {t('common.notFound', 'Hozircha videolar mavjud emas')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Tez orada bu bo'limda litsey hayotiga oid qiziqarli videolar paydo bo'ladi.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-10">
              {videos.map((video, index) => {
                const trans = videoService.getTranslation(video, i18n.language);
                const createdDate = new Date(video.created_at);
                const isPlaying = playingVideoId === video.id;

                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      {isPlaying ? (
                        <div className="relative w-full h-full">
                          <video
                            src={video.video_file}
                            controls
                            autoPlay
                            className="w-full h-full"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingVideoId(null);
                            }}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
                            title={t('common.stop', 'To‘xtatish')}
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        <div 
                          className="relative w-full h-full cursor-pointer group/thumb"
                          onClick={() => setPlayingVideoId(video.id)}
                        >
                          <img
                            src={video.thumbnail}
                            alt={trans.title}
                            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 opacity-90 group-hover/thumb:opacity-100"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/40 transition-colors duration-500" />
                          
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-[#0d89b1] flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-all duration-500 group-hover/thumb:bg-white">
                              <Play className="w-6 h-6 text-white group-hover/thumb:text-[#0d89b1] fill-current ml-1 transition-colors" />
                            </div>
                          </div>

                          {/* Date Badge */}
                          <div className="absolute top-4 left-4">
                            <div className="px-3 py-1 bg-black/30 backdrop-blur-md rounded border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest">
                              {createdDate.toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ')}
                            </div>
                          </div>

                          {/* External Link Icon */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                            <a
                              href={video.video_file}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded hover:bg-white/20 transition-colors block"
                              title={t('common.openInNewTab', 'Yangi oynada ochish')}
                            >
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 bg-[#0d89b1] rounded-full" />
                        <span className="text-[10px] font-bold text-[#0d89b1] uppercase tracking-[0.2em]">
                          {t('nav.videos')}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight uppercase tracking-tight group-hover:text-[#0d89b1] transition-colors">
                        {trans.title || t('nav.videos')}
                      </h3>
                      
                      {trans.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed line-clamp-2 opacity-80">
                          {trans.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

