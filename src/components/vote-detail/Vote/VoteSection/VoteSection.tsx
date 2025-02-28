import { Suspense } from 'react';
import Loading from '@/components/common/Loading';
import VoteCardList from '@/components/vote-detail/Vote/VoteCard/VoteCardList';
import VoteResultList from '@/components/vote-detail/Vote/VoteResult/VoteResultList';

export default function VoteSection() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <VoteCardList />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <VoteResultList />
      </Suspense>
    </>
  );
}
