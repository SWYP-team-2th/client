import PollBasicInformation from './PollBasicInformation';
import PollChoiceInformation from './PollChoiceInformation';
import FieldContainer from '../FieldContainer';
import usePollForm from '../Provider/hooks';

export default function PollInformation() {
  const { type } = usePollForm();

  return (
    <FieldContainer className="flex flex-col gap-8">
      <PollBasicInformation />
      {type === 'REGIST' && <PollChoiceInformation />}
    </FieldContainer>
  );
}
