import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import DefaultLayout from '@/components/common/layout/DefaultLayout';
import SubLayout from '@/components/common/layout/SubLayout';
import OnBoardingPage from '@/pages/onboarding/OnBoardingPage';
import PostPage from '@/pages/post/PostPage';

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
    children: [{ path: '/onboarding', element: <OnBoardingPage /> }],
  },
]);
