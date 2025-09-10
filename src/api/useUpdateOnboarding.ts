import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface OnboardingStep {
  WELCOME_GUIDE: boolean;
  FIRST_VOTE: boolean;
}

interface UpdateOnboardingRequest {
  onboardingStep: OnboardingStep;
}

interface UpdateOnboardingResponse {
  id: number;
  nickname: string;
  profileImageUrl: string;
  notification: boolean;
  onboardingStep: OnboardingStep;
}

export default function useUpdateOnboarding(
  options?: UseMutationOptions<
    UpdateOnboardingResponse,
    Error,
    UpdateOnboardingRequest
  >,
) {
  return useMutation<UpdateOnboardingResponse, Error, UpdateOnboardingRequest>({
    mutationFn: async (data: UpdateOnboardingRequest) => {
      return request<UpdateOnboardingResponse>({
        method: 'PATCH',
        url: '/users/onboarding',
        data,
      });
    },
    ...options,
  });
}
