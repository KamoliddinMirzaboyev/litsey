import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/HomePage')).HomePage }) },
      { path: 'about', lazy: async () => ({ Component: (await import('./pages/AboutPage')).AboutPage }) },
      { path: 'leadership', lazy: async () => ({ Component: (await import('./pages/LeadershipPage')).LeadershipPage }) },
      { path: 'teachers', lazy: async () => ({ Component: (await import('./pages/TeachersPage')).TeachersPage }) },
      { path: 'departments', lazy: async () => ({ Component: (await import('./pages/DepartmentsPage')).DepartmentsPage }) },
      { path: 'gallery', lazy: async () => ({ Component: (await import('./pages/GalleryPage')).GalleryPage }) },
      { path: 'videos', lazy: async () => ({ Component: (await import('./pages/VideosPage')).VideosPage }) },
      { path: 'infrastructure', lazy: async () => ({ Component: (await import('./pages/InfrastructurePage')).InfrastructurePage }) },
      { path: 'subjects', lazy: async () => ({ Component: (await import('./pages/SubjectsPage')).SubjectsPage }) },
      { path: 'programs', lazy: async () => ({ Component: (await import('./pages/ProgramsPage')).ProgramsPage }) },
      { path: 'schedule', lazy: async () => ({ Component: (await import('./pages/SchedulePage')).SchedulePage }) },
      { path: 'library', lazy: async () => ({ Component: (await import('./pages/LibraryPage')).LibraryPage }) },
      { path: 'photos', lazy: async () => ({ Component: (await import('./pages/PhotosPage')).PhotosPage }) },
      { path: 'admission', lazy: async () => ({ Component: (await import('./pages/AdmissionPage')).AdmissionPage }) },
      { path: 'news', lazy: async () => ({ Component: (await import('./pages/NewsPage')).NewsPage }) },
      { path: 'news/:slug', lazy: async () => ({ Component: (await import('./pages/NewsDetailPage')).NewsDetailPage }) },
      { path: 'announcements', lazy: async () => ({ Component: (await import('./pages/AnnouncementsPage')).AnnouncementsPage }) },
      { path: 'announcements/:slug', lazy: async () => ({ Component: (await import('./pages/AnnouncementsDetailPage')).AnnouncementsDetailPage }) },
      { path: 'contact', lazy: async () => ({ Component: (await import('./pages/ContactPage')).ContactPage }) },
      { path: '*', lazy: async () => ({ Component: (await import('./pages/NotFoundPage')).NotFoundPage }) },
    ],
  },
]);
