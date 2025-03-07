import useVoteRegist from '../Provider/hooks';
import RadioGroup, {
  RadioOption,
} from '@/components/common/RadioGroup/RadioGroup';

const VOTE_TYPE_OPTIONS: RadioOption[] = [
  {
    value: 'SINGLE',
    label: '한 개의 사진만 선택 가능',
  },
  {
    value: 'MULTIPLE',
    label: '여러 개의 사진 선택 가능',
  },
] as const;

export default function VoteType() {
  const { state, setVoteType } = useVoteRegist();

  return (
    <div>
      <RadioGroup
        options={VOTE_TYPE_OPTIONS}
        value={state.voteType.value}
        onChange={(value) => {
          setVoteType(value as 'SINGLE' | 'MULTIPLE' | null);
        }}
        name="voteType"
      />
    </div>
  );
}
