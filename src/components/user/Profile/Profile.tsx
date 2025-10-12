import useProfile from './hooks';
import Avatar from '@/components/common/Avatar';
import Icon from '@/components/common/Icon';

interface ProfileProps {
  profileImageUrl: string;
  name: string;
}

export default function Profile({ profileImageUrl, name }: ProfileProps) {
  const { handleClickSettingsButton, isMyProfile } = useProfile();

  return (
    <div className="px-5 pt-6 pb-12 bg-primary-500 text-gray-100 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Avatar size="large" src={profileImageUrl} />
        <p className="text-heading-2">{name}</p>
      </div>
      {isMyProfile && (
        <button
          className="flex items-center gap-[2px] bg-primary-600 py-1 px-2 rounded-full cursor-pointer"
          onClick={handleClickSettingsButton}
        >
          <Icon name="SettingsOutline" size="small" strokeColor="white" />
          <p className="text-body-2">설정</p>
        </button>
      )}
    </div>
  );
}
