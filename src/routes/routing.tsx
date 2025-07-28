import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/components/common/Layout/DefaultLayout';
import SubLayout from '@/components/common/Layout/SubLayout';
import Home from '@/pages/Home/Home';
import OAuthPage from '@/pages/Login/OAuthPage';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
import OnBoardingPage from '@/pages/OnBoarding/OnBoardingPage';
import PollDetailPage from '@/pages/PollDetail/PollDetailPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicy/PrivacyPolicyPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import TermsPage from '@/pages/Terms/TermsPage';
import PollEditPage from '@/pages/Vote/PollEditPage';
import VoteCommentDetailPage from '@/pages/Vote/VoteCommentDetailPage';
import VotePage from '@/pages/Vote/VotePage';
import VoteRegistPage from '@/pages/Vote/VoteRegistPage';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
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
        path: '/votes/:shareUrl',
        element: <VotePage />,
      },
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
        path: '/polls/:pollId/edit',
        element: <PollEditPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
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
