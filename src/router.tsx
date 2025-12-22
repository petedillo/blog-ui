import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LoginPage from './pages/admin/LoginPage';
import AdminPostsListPage from './pages/admin/AdminPostsListPage';
import PostEditorPage from './pages/admin/PostEditorPage';
import AdminMediaManagerPage from './pages/admin/AdminMediaManagerPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <BlogListPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'search', element: <SearchPage /> },
      {
        path: 'admin',
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'posts', element: <ProtectedRoute><AdminPostsListPage /></ProtectedRoute> },
          { path: 'posts/new', element: <ProtectedRoute><PostEditorPage /></ProtectedRoute> },
          { path: 'posts/:id/edit', element: <ProtectedRoute><PostEditorPage /></ProtectedRoute> },
          { path: 'media', element: <ProtectedRoute><AdminMediaManagerPage /></ProtectedRoute> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);