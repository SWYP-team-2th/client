import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/components/common/Layout/DefaultLayout';
import SubLayout from '@/components/common/Layout/SubLayout';
import Home from '@/pages/Home/Home';
import OAuthPage from '@/pages/Login/OAuthPage';
import MyPage from '@/pages/my/MyPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import OnBoardingPage from '@/pages/OnBoarding/OnBoardingPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import VoteCommentDetailPage from '@/pages/Vote/VoteCommentDetailPage';
import VotePage from '@/pages/Vote/VotePage';
import VoteRegistPage from '@/pages/Vote/VoteRegistPage';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/votes/:shareUrl',
        element: <VotePage />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/user/:userId',
        element: <MyPage />,
      },
    ],
  },
  {
    element: <SubLayout />,
    children: [
      { path: '/onboarding', element: <OnBoardingPage /> },
      {
        path: '/votes/:shareUrl/comments',
        element: <VoteCommentDetailPage />,
      },
      {
        path: '/oauth',
        element: <OAuthPage />,
      },
      {
        path: '/votes/regist',
        element: <VoteRegistPage />,
      },

      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
