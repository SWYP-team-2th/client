import PollInformation from '@/components/vote-regist/PollInformation';
import PollOptionSection from '@/components/vote-regist/PollOptionSection';
import { PollProvider } from '@/components/vote-regist/Provider/PollRegistProvider';

export default function VoteRegistPage() {
  return (
    <div>
      <PollProvider>
        <PollInformation />
        <PollOptionSection />
      </PollProvider>
    </div>
  );
}
