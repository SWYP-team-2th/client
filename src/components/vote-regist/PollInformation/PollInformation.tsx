import FieldContainer from '../FieldContainer';
import PollBasicInformation from './PollBasicInformation';
import PollChoiceInformation from './PollChoiceInformation';
import usePollRegist from '../Provider/hooks';

export default function PollInformation() {
  const { type } = usePollRegist();

  return (
    <FieldContainer className="flex flex-col gap-8">
      <PollBasicInformation />
      {type === 'REGIST' && <PollChoiceInformation />}
    </FieldContainer>
  );
}
