import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import PollCloseOptionSection from '@/components/poll/PollCloseOptionSection';
import PollInformation from '@/components/poll/PollInformation';
import PollOptionSection from '@/components/poll/PollOptionSection';
import { INITIAL_POLL_REGIST_DATA } from '@/components/poll/Provider/constants';
import { PollFormProvider } from '@/components/poll/Provider/PollFormProvider';
import PollSubmitButton from '@/components/poll/regist/PollRegistButton';

export default function VoteRegistPage() {
  return (
    <div>
      <Header
        className="bg-white"
        leftNode={<Icon name="ThickClose" size="large" />}
        centerNode={<h1 className="text-heading-1">투표</h1>}
        rightNode={<Icon name="BellOutline" size="large" />}
      />
      <PollFormProvider type="REGIST" initialData={INITIAL_POLL_REGIST_DATA}>
        <PollInformation />
        <PollOptionSection />
        <PollCloseOptionSection />
        <PollSubmitButton />
      </PollFormProvider>
    </div>
  );
}
