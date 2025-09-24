import useProfileEditForm from './hooks';
import { Button } from '@/components/common/Button/Button';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import TextField from '@/components/common/TextField';

export default function ProfileEditForm() {
  const {
    profile,
    setProfile,
    isUploading,
    handleUploadImage,
    putMyInfo,
    fileInputRef,
    isPendingMyInfo,
    isButtonDisabled,
  } = useProfileEditForm();

  return (
    <form className="pt-8 pb-10 px-6 min-h-[calc(100vh-55px)] flex flex-col justify-between">
      <div className="flex flex-col gap-9 w-full">
        <div className="relative self-center">
          {isUploading ? (
            <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
              <Loading className="w-10 h-10" />
            </div>
          ) : (
            <img
              className="w-24 h-24 rounded-full"
              src={profile.profileImageUrl}
              alt="profile"
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                handleUploadImage(file);
              }
            }}
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 border-gray-400 border-[1px] bg-white rounded-full p-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon name="EditFill" size="medium" />
          </button>
        </div>
        <TextField
          className="h-[46px] w-full"
          variant="outlined"
          label="닉네임 수정"
          status={profile.nickname === '' ? 'error' : 'default'}
          value={profile.nickname}
          onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
          maxLength={15}
        />
      </div>
      <Button
        variant="solid"
        size="large"
        buttonType={isButtonDisabled ? 'disabled' : 'primary'}
        onClick={(e) => {
          e.preventDefault();
          putMyInfo(profile);
        }}
      >
        {isPendingMyInfo ? <Loading /> : '수정하기'}
      </Button>
    </form>
  );
}
