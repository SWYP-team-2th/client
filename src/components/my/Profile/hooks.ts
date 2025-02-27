import { useParams } from 'react-router-dom';
import useGetUserInfo from '@/api/useGetUserInfo';

export default function useProfile() {
  const { userId } = useParams<{ userId: string }>();
  const { data: userInfo } = useGetUserInfo(Number(userId));

  return {
    userInfo,
  };
}
