import { createBrowserRouter, useRouteError } from 'react-router';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { TeachersPage } from './pages/TeachersPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { GalleryPage } from './pages/GalleryPage';
import { VideosPage } from './pages/VideosPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { SubjectsPage } from './pages/SubjectsPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { SchedulePage } from './pages/SchedulePage';
import { LibraryPage } from './pages/LibraryPage';
import { PhotosPage } from './pages/PhotosPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { AnnouncementsDetailPage } from './pages/AnnouncementsDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function RouteErrorBoundary() {
  const error: any = useRouteError();
  console.error("Route error:", error);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3">
          Xatolik yuz berdi
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium leading-relaxed">
          Sahifani yuklashda xatolik yuz berdi. Iltimos, sahifani yangilang yoki bosh sahifaga qayting.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-3 bg-[#0d89b1] text-white rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-[#0b7396] transition-all shadow-md"
          >
            Yangilash
          </button>
          <a
            href="/"
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-center flex items-center justify-center"
          >
            Bosh sahifa
          </a>
        </div>
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
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'leadership', Component: LeadershipPage },
      { path: 'teachers', Component: TeachersPage },
      { path: 'departments', Component: DepartmentsPage },
      { path: 'gallery', Component: GalleryPage },
      { path: 'videos', Component: VideosPage },
      { path: 'infrastructure', Component: InfrastructurePage },
      { path: 'subjects', Component: SubjectsPage },
      { path: 'programs', Component: ProgramsPage },
      { path: 'schedule', Component: SchedulePage },
      { path: 'library', Component: LibraryPage },
      { path: 'photos', Component: PhotosPage },
      { path: 'admission', Component: AdmissionPage },
      { path: 'news', Component: NewsPage },
      { path: 'news/:slug', Component: NewsDetailPage },
      { path: 'announcements', Component: AnnouncementsPage },
      { path: 'announcements/:slug', Component: AnnouncementsDetailPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
