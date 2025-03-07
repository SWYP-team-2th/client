import Switch from '@/components/common/Switch';
import useVoteRegist from '@/components/vote-regist/Provider/hooks';

export default function VoteScope() {
  const { state, setScope } = useVoteRegist();

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex items-center justify-between">
        <p className="text-body-2-long text-gray-800">전체 공개</p>
        <Switch
          size="small"
          checked={state.scope.value === 'PUBLIC'}
          onChange={() => {
            setScope(state.scope.value === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC');
          }}
          name="scope"
        />
      </div>
      <p className="text-gray-600 text-caption">
        홈 피드에 공개됩니다. 비활성화 시, 링크와 마이페이지를 통해서 접근할 수
        있어요!
      </p>
    </div>
  );
}
