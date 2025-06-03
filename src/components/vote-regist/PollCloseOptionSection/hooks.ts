import { MAX_VOTER_COUNT } from '../Provider/constants';
import usePollRegist from '../Provider/hooks';

export default function usePollCloseOptionSection() {
  const { data, setCloseType, setClosedAt, setMaxVoterCount } = usePollRegist();

  const handleMaxVoterCount = (value: string) => {
    const onlyNums = value.replace(/[^0-9]/g, '');
    const num = Number(onlyNums);
    setMaxVoterCount(onlyNums === '' ? 0 : Math.min(num, MAX_VOTER_COUNT));
  };

  return {
    closeType: data.closeOptions.closeType,
    closedAt: data.closeOptions.closedAt,
    maxVoterCount: data.closeOptions.maxVoterCount,
    setCloseType,
    setClosedAt,
    handleMaxVoterCount,
  };
}
