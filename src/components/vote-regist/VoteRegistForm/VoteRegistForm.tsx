import FieldContainer from '../FieldContainer';
import VoteDescription from '../VoteDescription';
import VoteImages from '../VoteImages';
import useVoteRegistForm from './hooks';
import { Button } from '@/components/common/Button/Button';

export default function VoteRegistForm() {
  const { isFormValid, handleClickVoteRegistButton } = useVoteRegistForm();

  return (
    <div className="relative pt-[65px]">
      <FieldContainer fieldTitle="투표 설명">
        <VoteDescription />
      </FieldContainer>
      <FieldContainer fieldTitle="사진선택" isLastField>
        <VoteImages />
      </FieldContainer>
      <Button
        buttonType={isFormValid ? 'primary' : 'disabled'}
        size="large"
        variant="solid"
        className="fixed bottom-16 left-1/2 -translate-x-1/2"
        onClick={handleClickVoteRegistButton}
      >
        투표 올리기
      </Button>
    </div>
  );
}
