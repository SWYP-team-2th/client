import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import PollCloseOptionSection from '@/components/vote-regist/PollCloseOptionSection';
import PollInformation from '@/components/vote-regist/PollInformation';
import PollOptionSection from '@/components/vote-regist/PollOptionSection';
import PollSubmitButton from '@/components/vote-regist/PollSubmitButton';
import { PollProvider } from '@/components/vote-regist/Provider/PollRegistProvider';

export default function VoteRegistPage() {
  return (
    <div>
      <Header
        className="bg-white"
        leftNode={<Icon name="ThickClose" size="large" />}
        centerNode={<h1 className="text-heading-1">투표</h1>}
        rightNode={<Icon name="BellOutline" size="large" />}
      />
      <PollProvider>
        <PollInformation />
        <PollOptionSection />
        <PollCloseOptionSection />
        <PollSubmitButton />
      </PollProvider>
    </div>
  );
}
