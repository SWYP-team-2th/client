import FieldContainer from '../FieldContainer';
import VoteDescription from '../VoteDescription';
import VoteImages from '../VoteImages';
import useVoteRegistForm from './hooks';
import { Button } from '@/components/common/Button/Button';
import Loading from '@/components/common/Loading';

export default function VoteRegistForm() {
  const { isFormValid, handleClickVoteRegistButton, isPostRegistVotePending } =
    useVoteRegistForm();

  return (
    <div className="relative pt-[65px]">
      <FieldContainer fieldTitle="투표 설명">
        <VoteDescription />
      </FieldContainer>
      <FieldContainer fieldTitle="사진선택" isLastField>
        <VoteImages />
      </FieldContainer>
      <Button
        buttonType={
          isFormValid && !isPostRegistVotePending ? 'primary' : 'disabled'
        }
        size="large"
        variant="solid"
        className="fixed bottom-16 left-1/2 -translate-x-1/2"
        onClick={handleClickVoteRegistButton}
      >
        {isPostRegistVotePending ? <Loading /> : '투표 올리기'}
      </Button>
    </div>
  );
}
