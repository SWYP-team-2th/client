import useToast from '../Toast/hooks';
import usePostGuestLogin from '@/api/usePostGuestLogin';
import { useDialog } from '@/components/common/Dialog/hooks';
import { setRole, setAccessToken } from '@/components/login/Auth/token';
import useKakaoLogin from '@/hooks/useKakaoLogin';

export default function useLoginDialog() {
  const { closeDialog } = useDialog();
  const toast = useToast();
  const { mutate: guestLoginMutate, isPending: isGuestLoginPending } =
    usePostGuestLogin({
      onSuccess: (data) => {
        toast.success({
          title: '게스트로 로그인 되었어요!',
        });
        setRole(data.role);
        setAccessToken(data.accessToken);
        closeDialog();
      },
    });

  const { handleKakaoLogin } = useKakaoLogin();
  const handleGuestLogin = () => {
    guestLoginMutate();
  };

  return {
    handleKakaoLogin,
    handleGuestLogin,
    isGuestLoginPending,
  };
}
