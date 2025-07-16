import type { Post } from '@/types/post';
import ContextMenu from '@/components/common/ContextMenu/ContextMenu';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/common/Label/Label';
import { useTimeAgo } from '@/hooks/useTimeAgo';
import { cn } from '@/utils/cn';

interface PollInfoProps {
  author: {
    profileUrl: string;
    nickname: string;
  };
  createdAt: string;
  status: Post['status'];
  closeOptions: Post['closeOptions'];
  title: string;
  description: string;
  voterCount: number;
  commentCount: number;
}

export default function PollInfo({
  author,
  createdAt,
  status,
  closeOptions,
  title,
  description,
  voterCount,
  commentCount,
}: PollInfoProps) {
  const timeAgo = useTimeAgo(createdAt);

  return (
    <div className="bg-white px-5  flex flex-col w-full">
      {/* 프로필 이미지, 닉네임, 시간*/}
      <div className="flex items-center gap-2 my-3">
        <img
          src={author.profileUrl}
          alt={author.nickname}
          className="w-8 h-8 rounded-full object-cover"
        />

        <div className="flex items-center mr-2">
          <span className="text-headline-1 mr-1">{author.nickname}</span>
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
          colorVarient={status === 'PROGRESS' ? 'progress' : 'ended'}
          size="medium"
        >
          {status === 'PROGRESS' ? '진행 중' : '투표 종료'}
        </Label>

        {/* 시간 설정으로 마감 시 nnn일 남음, 직접 마감으로 마감 시 직접 마감 라벨, 투표 수로 마감 시 n명 참여중 n명 참여 시 마감*/}
        <span
          className={cn('text-label-1', {
            'text-accent-900': status === 'CLOSED',
            'text-primary-500': status !== 'CLOSED',
          })}
        >
          {status !== 'CLOSED' && closeOptions.closeType === 'DATE' && (
            <>{closeOptions.closedAt}일 남음</>
          )}
          {status !== 'CLOSED' && closeOptions.closeType === 'SELF' && (
            <Label variant="outline" colorVarient="progress" size="medium">
              직접 마감
            </Label>
          )}
          {closeOptions.closeType === 'VOTER' && (
            <>
              {status === 'CLOSED'
                ? `${voterCount}명 참여`
                : `${voterCount}명 참여 중 ${closeOptions.maxVoterCount}명 참여 시 마감`}
            </>
          )}
        </span>
      </div>
      <div className="flex flex-col gap-[6px] mt-3 mb-2">
        <span className="text-heading-2">{title}</span>
        <span className="text-headline-2 ">{description}</span>
      </div>
      <div className="flex items-center justify-end gap-1 text-gray-600 text-sm">
        <Icon name="DeadLineDarkGray" size="small" />
        {voterCount}
        <span className="px-[2px]">·</span>
        <Icon name="MessageOutlineDarkGray" size="small" />
        {commentCount}
      </div>
    </div>
  );
}
