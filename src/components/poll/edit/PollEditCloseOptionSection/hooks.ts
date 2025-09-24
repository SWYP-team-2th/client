import { MAX_VOTER_COUNT } from '../../Provider/constants';
import usePollForm from '../../Provider/hooks';

export default function usePollEditCloseOptionSection() {
  const { data, setClosedAt, setMaxVoterCount } = usePollForm();

  const handleMaxVoterCount = (value: string) => {
    const onlyNums = value.replace(/[^0-9]/g, '');
    const num = Number(onlyNums);
    setMaxVoterCount(onlyNums === '' ? 0 : Math.min(num, MAX_VOTER_COUNT));
  };

  return {
    closeType: data.closeOption.closeType,
    closedAt: data.closeOption.closedAt,
    maxVoterCount: data.closeOption.maxVoterCount,
    setClosedAt,
    handleMaxVoterCount,
  };
}
