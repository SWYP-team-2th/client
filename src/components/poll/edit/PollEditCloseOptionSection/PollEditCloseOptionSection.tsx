import usePollEditCloseOptionSection from './hooks';
import FieldContainer from '../../FieldContainer';
import {
  MaxVoterCountContent,
  TimeCloseContent,
} from '../../PollCloseOptionSection/PollCloseOptionSection';

export default function PollEditCloseOptionSection() {
  const {
    closeType,
    closedAt,
    setClosedAt,
    maxVoterCount,
    handleMaxVoterCount,
  } = usePollEditCloseOptionSection();

  if (closeType === 'SELF') return null;

  return (
    <FieldContainer title="마감 설정" isLastField>
      {
        {
          DATE: (
            <TimeCloseContent
              closedAt={closedAt ?? ''}
              setClosedAt={setClosedAt}
            />
          ),
          VOTER: (
            <MaxVoterCountContent
              maxVoterCount={maxVoterCount ?? 0}
              setMaxVoterCount={handleMaxVoterCount}
            />
          ),
        }[closeType]
      }
    </FieldContainer>
  );
}
