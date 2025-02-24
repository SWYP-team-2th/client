import useGetUserInfo from '@/api/useGetUserInfo';

export default function useProfile() {
  const { data: userInfo } = useGetUserInfo(1);

  return {
    userInfo,
  };
}
