import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import PollCloseOptionSection from '@/components/poll/PollCloseOptionSection';
import PollInformation from '@/components/poll/PollInformation';
import PollOptionSection from '@/components/poll/PollOptionSection';
import { INITIAL_POLL_REGIST_DATA } from '@/components/poll/Provider/constants';
import { PollFormProvider } from '@/components/poll/Provider/PollFormProvider';
import PollSubmitButton from '@/components/poll/regist/PollRegistButton';

export default function VoteRegistPage() {
  const navigate = useNavigate();

  const handleClickCloseButton = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header
        className="bg-white"
        leftNode={
          <Icon
            name="Close"
            size="large"
            className="cursor-pointer"
            onClick={handleClickCloseButton}
          />
        }
        centerNode={<h1 className="text-heading-1">투표 만들기</h1>}
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
