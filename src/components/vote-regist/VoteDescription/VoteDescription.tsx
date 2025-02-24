import { MAX_DESCRIPTION_LENGTH } from '../constants';
import useVoteDescription from './hooks';
import TextField from '@/components/common/TextField';

export default function VoteDescription() {
  const { description, setDescription } = useVoteDescription();

  return (
    <TextField
      variant="solid"
      placeholder="내용을 입력해주세요."
      showLengthIndicator
      maxLength={MAX_DESCRIPTION_LENGTH}
      value={description ?? ''}
      onChange={(e) => setDescription(e.target.value)}
    />
  );
}
