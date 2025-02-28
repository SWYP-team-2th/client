import usePostGuestVote from '@/api/usePostGuestVote';
import { useParams } from 'react-router-dom';

export default function Test() {
  const { postId } = useParams<{ postId: string }>();
  const { mutate } = usePostGuestVote(Number(postId));

  const handleGuestVote = () => {
    mutate({ imageId: 1 });
  };

  return (
    <div>
      <button onClick={handleGuestVote}>게스트 투표하기</button>
    </div>
  );
}
