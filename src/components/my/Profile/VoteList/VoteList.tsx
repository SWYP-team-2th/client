import { Suspense, useState } from 'react';
import MyVoteList from './MyVoteList';
import ParticipatedVoteList from './ParticipatedVoteList';
import Tab from './Tab';
import Loading from '@/components/common/Loading';

export default function VoteList() {
  const [tab, setTab] = useState<'my' | 'participated'>('my');

  const handleClickTabMenu = (tab: 'my' | 'participated') => () => {
    setTab(tab);
  };

  return (
    <div className="flex flex-col gap-6">
      <Tab selectedTab={tab} onClickTabMenu={handleClickTabMenu} />
      <Suspense fallback={<Loading />}>
        {tab === 'my' && <MyVoteList />}
      </Suspense>
      <Suspense fallback={<Loading />}>
        {tab === 'participated' && <ParticipatedVoteList />}
      </Suspense>
    </div>
  );
}
