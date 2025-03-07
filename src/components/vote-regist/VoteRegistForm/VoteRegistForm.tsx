import useVoteRegistForm from './hooks';
import { Button } from '@/components/common/Button/Button';
import Loading from '@/components/common/Loading';
import FieldContainer from '@/components/vote-regist/FieldContainer';
import VoteDescription from '@/components/vote-regist/VoteDescription';
import VoteImages from '@/components/vote-regist/VoteImages';
import VoteScope from '@/components/vote-regist/VoteScope';
import VoteType from '@/components/vote-regist/VoteType';

export default function VoteRegistForm() {
  const { isFormValid, handleClickVoteRegistButton, isPostRegistVotePending } =
    useVoteRegistForm();

  return (
    <div className="relative pt-[60px]">
      <div className="overflow-y-auto w-full h-full pb-32">
        <FieldContainer fieldTitle="투표 설명">
          <VoteDescription />
        </FieldContainer>
        <FieldContainer fieldTitle="사진선택">
          <VoteImages />
        </FieldContainer>
        <FieldContainer fieldTitle="투표 설정">
          <VoteType />
        </FieldContainer>
        <FieldContainer fieldTitle="공개 범위" isLastField>
          <VoteScope />
        </FieldContainer>
      </div>
      <div className="fixed bottom-0 pt-4 pb-8 px-[25px] w-full max-w-screen-sm bg-gray-100">
        <Button
          buttonType={
            isFormValid && !isPostRegistVotePending ? 'primary' : 'disabled'
          }
          size="large"
          variant="solid"
          onClick={handleClickVoteRegistButton}
        >
          {isPostRegistVotePending ? <Loading /> : '투표 올리기'}
        </Button>
      </div>
    </div>
  );
}
