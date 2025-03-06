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
    <div className="flex flex-col gap-7 w-full h-full flex-1 min-h-0 bg-gray-100 px-6 rounded-t-[20px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]">
      <Tab selectedTab={tab} onClickTabMenu={handleClickTabMenu} />
      <div className="overflow-y-auto flex-1 min-h-0">
        <Suspense fallback={<Loading />}>
          {tab === 'my' && <MyVoteList />}
        </Suspense>
        <Suspense fallback={<Loading />}>
          {tab === 'participated' && <ParticipatedVoteList />}
        </Suspense>
      </div>
    </div>
  );
}
