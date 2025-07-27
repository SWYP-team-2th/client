import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import PollEditButton from '@/components/poll/edit/PollEditButton';
import PollCloseOptionSection from '@/components/vote-regist/PollCloseOptionSection';
import PollInformation from '@/components/vote-regist/PollInformation';
import PollOptionSection from '@/components/vote-regist/PollOptionSection';
import { INITIAL_POLL_REGIST_DATA } from '@/components/vote-regist/Provider/constants';
import { PollProvider } from '@/components/vote-regist/Provider/PollRegistProvider';

export default function PollEditPage() {
  return (
    <div>
      <Header
        className="bg-white"
        leftNode={<Icon name="ThickClose" size="large" />}
        centerNode={<h1 className="text-heading-1">투표</h1>}
        rightNode={<Icon name="BellOutline" size="large" />}
      />
      {/* TODO: 초깃값 넣어주는 로직 작성 */}
      <PollProvider type="EDIT" initialData={INITIAL_POLL_REGIST_DATA}>
        <PollInformation />
        <PollOptionSection />
        <PollCloseOptionSection />
        <PollEditButton />
      </PollProvider>
    </div>
  );
}
