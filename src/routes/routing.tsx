import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Logo from '@/assets/icons/logo.svg?react';
import Icon from '@/components/common/Icon';
import DefaultLayout from '@/components/common/Layout/DefaultLayout';
import SubLayout from '@/components/common/Layout/SubLayout';
import VotePage from '@/pages/\bVote/VotePage';
import OnBoardingPage from '@/pages/OnBoarding/OnBoardingPage';
export const router = createBrowserRouter([
  {
    element: (
      <DefaultLayout
        headerNode={{
          leftNode: <Icon name="ArrowLeft" size="large" />,
          centerNode: (
            <Logo
              style={{
                width: '70px',
              }}
            />
          ),
          rightNode: <Icon name="UserFill" size="large" />,
        }}
      />
    ),
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
