import FieldContainer from '../FieldContainer';
import PollBasicInformation from './PollBasicInformation';
import PollChoiceInformation from './PollChoiceInformation';

export default function PollInformation() {
  return (
    <FieldContainer className="flex flex-col gap-8">
      <PollBasicInformation />
      <PollChoiceInformation />
    </FieldContainer>
  );
}
