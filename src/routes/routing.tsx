import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import DefaultLayout from '@/components/common/Layout/DefaultLayout';
import SubLayout from '@/components/common/Layout/SubLayout';
import OnBoardingPage from '@/pages/OnBoarding/OnBoardingPage';
import VotePage from '@/pages/\bVote/VotePage';

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <App /> },
      {
        path: '/votes/:shareUrl',
        element: <VotePage />,
      },
    ],
  },
  {
    element: <SubLayout />,
    children: [{ path: '/onboarding', element: <OnBoardingPage /> }],
  },
]);
