import App from '@/App';
import DefaultLayout from '@/components/common/layout/DefaultLayout';
import SubLayout from '@/components/common/layout/SubLayout';
import OnBoarding from '@/pages/onboarding/OnBoarding';
import PostPage from '@/pages/post/PostPage';
import PostZoomPage from '@/pages/post/PostZoomPage';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <App /> },
      {
        path: '/posts/:shareUrl',
        element: <PostPage />,
      },
    ],
  },
  {
    element: <SubLayout />,
    children: [
      { path: '/onboarding', element: <OnBoarding /> },
      { path: '/posts/:shareUrl/photo/:photoId', element: <PostZoomPage /> },
    ],
  },
]);
