import { createBrowserRouter, useRouteError } from 'react-router';
import { Layout } from './components/layout/Layout';
import { useEffect } from 'react';

// Gracefully handle dynamic chunk errors after new deployments
function safeLazy<T>(importer: () => Promise<T>): () => Promise<T> {
  return async () => {
    try {
      return await importer();
    } catch (err: any) {
      const msg = err?.message || String(err || '');
      if (
        msg.includes('Failed to fetch dynamically imported module') ||
        msg.includes('error loading dynamically imported module') ||
        msg.includes('Importing a module script failed')
      ) {
        const key = 'chunk_reload_timestamp';
        const last = sessionStorage.getItem(key);
        const now = Date.now();
        if (!last || now - parseInt(last, 10) > 10000) {
          sessionStorage.setItem(key, now.toString());
          window.location.reload();
          return new Promise(() => {}) as unknown as T;
        }
      }
      throw err;
    }
  };
}

function RouteErrorBoundary() {
  const error: any = useRouteError();
  const msg = error?.message || String(error || '');
  const isChunkError =
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('Importing a module script failed');

  useEffect(() => {
    if (isChunkError) {
      const key = 'chunk_reload_timestamp';
      const last = sessionStorage.getItem(key);
      const now = Date.now();
      if (!last || now - parseInt(last, 10) > 10000) {
        sessionStorage.setItem(key, now.toString());
        window.location.reload();
      }
    }
  }, [isChunkError]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3">
          {isChunkError ? "Sayt yangilandi" : "Xatolik yuz berdi"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium leading-relaxed">
          {isChunkError
            ? "Saytning yangi versiyasi yuklanmoqda, iltimos kuting..."
            : "Sahifani yuklashda xatolik yuz berdi. Iltimos, sahifani yangilang."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 bg-[#0d89b1] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#0b7396] transition-all shadow-lg"
        >
          Sahifani yangilash
        </button>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      { index: true, lazy: safeLazy(async () => ({ Component: (await import('./pages/HomePage')).HomePage })) },
      { path: 'about', lazy: safeLazy(async () => ({ Component: (await import('./pages/AboutPage')).AboutPage })) },
      { path: 'leadership', lazy: safeLazy(async () => ({ Component: (await import('./pages/LeadershipPage')).LeadershipPage })) },
      { path: 'teachers', lazy: safeLazy(async () => ({ Component: (await import('./pages/TeachersPage')).TeachersPage })) },
      { path: 'departments', lazy: safeLazy(async () => ({ Component: (await import('./pages/DepartmentsPage')).DepartmentsPage })) },
      { path: 'gallery', lazy: safeLazy(async () => ({ Component: (await import('./pages/GalleryPage')).GalleryPage })) },
      { path: 'videos', lazy: safeLazy(async () => ({ Component: (await import('./pages/VideosPage')).VideosPage })) },
      { path: 'infrastructure', lazy: safeLazy(async () => ({ Component: (await import('./pages/InfrastructurePage')).InfrastructurePage })) },
      { path: 'subjects', lazy: safeLazy(async () => ({ Component: (await import('./pages/SubjectsPage')).SubjectsPage })) },
      { path: 'programs', lazy: safeLazy(async () => ({ Component: (await import('./pages/ProgramsPage')).ProgramsPage })) },
      { path: 'schedule', lazy: safeLazy(async () => ({ Component: (await import('./pages/SchedulePage')).SchedulePage })) },
      { path: 'library', lazy: safeLazy(async () => ({ Component: (await import('./pages/LibraryPage')).LibraryPage })) },
      { path: 'photos', lazy: safeLazy(async () => ({ Component: (await import('./pages/PhotosPage')).PhotosPage })) },
      { path: 'admission', lazy: safeLazy(async () => ({ Component: (await import('./pages/AdmissionPage')).AdmissionPage })) },
      { path: 'news', lazy: safeLazy(async () => ({ Component: (await import('./pages/NewsPage')).NewsPage })) },
      { path: 'news/:slug', lazy: safeLazy(async () => ({ Component: (await import('./pages/NewsDetailPage')).NewsDetailPage })) },
      { path: 'announcements', lazy: safeLazy(async () => ({ Component: (await import('./pages/AnnouncementsPage')).AnnouncementsPage })) },
      { path: 'announcements/:slug', lazy: safeLazy(async () => ({ Component: (await import('./pages/AnnouncementsDetailPage')).AnnouncementsDetailPage })) },
      { path: 'contact', lazy: safeLazy(async () => ({ Component: (await import('./pages/ContactPage')).ContactPage })) },
      { path: '*', lazy: safeLazy(async () => ({ Component: (await import('./pages/NotFoundPage')).NotFoundPage })) },
    ],
  },
]);
