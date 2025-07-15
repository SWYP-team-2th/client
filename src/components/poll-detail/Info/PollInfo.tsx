import type { Post } from '@/types/post';
import ContextMenu from '@/components/common/ContextMenu/ContextMenu';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/common/Label/Label';
import { useTimeAgo } from '@/hooks/useTimeAgo';

export default function PollInfo({ post }: { post: Post }) {
  const timeAgo = useTimeAgo(post.createdAt);

  return (
    <div className="bg-white px-5  flex flex-col w-full">
      {/* 프로필 이미지, 닉네임, 시간*/}
      <div className="flex items-center gap-2 my-3">
        <img
          src={post.author.profileUrl}
          alt={post.author.nickname}
          className="w-8 h-8 rounded-full object-cover"
        />

        <div className="flex items-center mr-2">
          <span className="text-headline-1 mr-1">{post.author.nickname}</span>
          <span className="text-body-2 text-gray-700">{timeAgo}</span>
        </div>

        {/* ContextMenu */}
        <div className="ml-auto flex items-center">
          <ContextMenu>
            <ContextMenu.Trigger>
              <Icon name="More" size="medium" className="cursor-pointer" />
            </ContextMenu.Trigger>
            <ContextMenu.List>
              <ContextMenu.Item
                icon={<Icon name="Post" size="medium" />}
                onClick={() => alert('수정!')}
              >
                투표 마감하기
              </ContextMenu.Item>
              <ContextMenu.Item
                icon={<Icon name="Trash" size="medium" />}
                className="text-body-1"
                onClick={() => alert('삭제!')}
              >
                투표 수정하기
              </ContextMenu.Item>
              <ContextMenu.Item
                icon={<Icon name="Trash" size="medium" />}
                className="text-body-1"
                onClick={() => alert('삭제!')}
              >
                투표 삭제하기
              </ContextMenu.Item>
            </ContextMenu.List>
          </ContextMenu>
        </div>
      </div>
      {/* 진행 여부 */}
      <div className="flex items-center gap-2">
        <Label
          variant="solid"
          colorVarient={post.status === 'PROGRESS' ? 'progress' : 'ended'}
          size="medium"
        >
          {post.status === 'PROGRESS' ? '진행 중' : '투표 종료'}
        </Label>

        {/* 시간 설정으로 마감 시 nnn일 남음, 직접 마감으로 마감 시 직접 마감 라벨, 투표 수로 마감 시 n명 참여중 n명 참여 시 마감*/}
        <span
          className={`text-label-1 ${post.status === 'CLOSED' ? 'text-accent-900' : 'text-primary-500'}`}
        >
          {post.status !== 'CLOSED' &&
            post.closeOptions.closeType === 'DATE' &&
            post.closeOptions.closedAt && (
              <>{post.closeOptions.closedAt}일 남음</>
            )}
          {post.status !== 'CLOSED' &&
            post.closeOptions.closeType === 'SELF' && (
              <Label variant="outline" colorVarient="progress" size="medium">
                직접 마감
              </Label>
            )}
          {post.closeOptions.closeType === 'VOTER' && (
            <>
              {post.status === 'CLOSED'
                ? `${post.voterCount}명 참여`
                : `${post.voterCount}명 참여 중 ${post.closeOptions.maxVoterCount}명 참여 시 마감`}
            </>
          )}
        </span>
      </div>
      <div className="flex flex-col gap-[6px] mt-3 mb-2">
        <span className="text-heading-2">{post.title}</span>
        <span className="text-headline-2 ">{post.description}</span>
      </div>
      <div className="flex items-center justify-end gap-1 text-gray-600 text-sm">
        <Icon name="DeadLineDarkGray" size="small" />
        {post.voterCount}
        <span className="px-[2px]">·</span>
        <Icon name="MessageOutlineDarkGray" size="small" />
        {post.commentCount}
      </div>
    </div>
  );
}
