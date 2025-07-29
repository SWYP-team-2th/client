import useProfile from './hooks';
import Avatar from '@/components/common/Avatar';
import Icon from '@/components/common/Icon';

interface ProfileProps {
  profileImageUrl: string;
  name: string;
}

export default function Profile({ profileImageUrl, name }: ProfileProps) {
  const { handleClickSettingsButton } = useProfile();

  return (
    <div className="px-5 pt-6 pb-12 bg-primary-500 text-gray-100 flex justify-between items-center">
      <div className="flex gap-4">
        <Avatar size="large" src={profileImageUrl} />
        <p className="text-title-3">{name}</p>
      </div>
      <button
        className="flex items-center gap-[2px] bg-primary-600 py-1 px-2 rounded-full cursor-pointer"
        onClick={handleClickSettingsButton}
      >
        <Icon name="SettingsOutline" size="medium" strokeColor="white" />
        <p className="text-body-1">설정</p>
      </button>
    </div>
  );
}
