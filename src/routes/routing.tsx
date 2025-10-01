import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/components/common/Layout/DefaultLayout';
import SubLayout from '@/components/common/Layout/SubLayout';
import Home from '@/pages/Home/Home';
import OAuthPage from '@/pages/Login/OAuthPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import NotificationPage from '@/pages/Notification/NotificationPage';
import OnBoardingPage from '@/pages/OnBoarding/OnBoardingPage';
import PollDetailPage from '@/pages/PollDetail/PollDetailPage';
import PollResultPage from '@/pages/PollDetail/PollResultPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicy/PrivacyPolicyPage';
import ProfilePage from '@/pages/settings/ProfilePage';
import SettingsPage from '@/pages/settings/SettingsPage';
import TermsPage from '@/pages/Terms/TermsPage';
import UserPage from '@/pages/User/UserPage';
import PollEditPage from '@/pages/Vote/PollEditPage';
import VoteRegistPage from '@/pages/Vote/VoteRegistPage';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/user/:userId',
        element: <UserPage />,
      },
      {
        path: '/notifications',
        element: <NotificationPage />,
      },
    ],
  },
  {
    element: <SubLayout />,
    children: [
      { path: '/onboarding', element: <OnBoardingPage /> },
      {
        path: '/posts/:postId',
        element: <PollDetailPage />,
      },
      {
        path: '/posts/:postId/result',
        element: <PollResultPage />,
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
        path: '/polls/:pollId/edit',
        element: <PollEditPage />,
      },
      {
        path: '/user/:userId/settings',
        element: <SettingsPage />,
      },
      {
        path: '/user/:userId/settings/profile',
        element: <ProfilePage />,
      },
      {
        path: '/terms',
        element: <TermsPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
