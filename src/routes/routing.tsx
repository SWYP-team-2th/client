import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import DefaultLayout from '@/components/common/Layout/DefaultLayout';
import SubLayout from '@/components/common/Layout/SubLayout';
import OnBoardingPage from '@/pages/OnBoarding/OnBoardingPage';
import PostPage from '@/pages/Post/PostPage';

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
