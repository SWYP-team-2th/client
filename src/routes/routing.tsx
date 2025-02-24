import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import DefaultLayout from '@/components/common/Layout/DefaultLayout';
import SubLayout from '@/components/common/Layout/SubLayout';
import VotePage from '@/pages/Vote/VotePage';
import VoteRegistPage from '@/pages/Vote/VoteRegistPage';
import MyPage from '@/pages/my/MyPage';
import OnBoardingPage from '@/pages/OnBoarding/OnBoardingPage';
import SettingsPage from '@/pages/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <App /> },
      {
        path: '/votes/:shareUrl',
        element: <VotePage />,
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
        path: '/user/:userId',
        element: <MyPage />,
      },
    ],
  },
  {
    element: <SubLayout />,
    children: [{ path: '/onboarding', element: <OnBoardingPage /> }],
  },
]);
