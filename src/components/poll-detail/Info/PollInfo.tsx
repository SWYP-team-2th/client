import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types/post';
import { useDeletePost } from '@/api/useDeletePost';
import usePostCloseVote from '@/api/usePostCloseVote';
import ContextMenu from '@/components/common/ContextMenu';
import Dialog from '@/components/common/Dialog';
import { useDialog } from '@/components/common/Dialog/hooks';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/common/Label/Label';
import useToast from '@/components/common/Toast/hooks';
import { cn } from '@/utils/cn';
import { getRemainedTimeText, getDeadlineText } from '@/utils/date/date';

interface PollInfoProps {
  author: {
    profileUrl: string;
    nickname: string;
  };
  isAuthor: boolean;
  createdAt: string;
  status: Post['status'];
  closeOption: Post['closeOption'];
  pollOption: Post['pollOption'];
  title: string;
  description: string;
  voterCount: number;
  commentCount: number;
  postId: number;
}

export default function PollInfo({
  author,
  isAuthor,
  createdAt,
  status,
  closeOption,
  pollOption,
  title,
  description,
  voterCount,
  commentCount,
  postId,
}: PollInfoProps) {
  const timeAgo = getRemainedTimeText({ dateString: createdAt, suffix: '전' });
  const { openDialog, closeDialog } = useDialog();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const closeVoteMutation = usePostCloseVote({
    onSuccess: () => {
      toast.success({ title: '투표가 마감되었습니다' });
      closeDialog();
      queryClient.invalidateQueries({ queryKey: ['post', postId?.toString()] });
    },
    onError: () => {
      toast.error({ title: '투표 마감에 실패했습니다' });
    },
  });

  const deletePostMutation = useDeletePost({
    onSuccess: () => {
      closeDialog();
      toast.success({ title: '투표가 삭제되었습니다' });
      navigate('/');
    },
    onError: () => {
      toast.error({ title: '투표 삭제에 실패했습니다' });
    },
  });

  const handleClosePost = () => {
    openDialog(
      <Dialog
        title="투표를 지금 마감할까요?"
        description="투표를 마감하면 더 이상 투표에 참여할 수 없어요."
        cancelButtonProps={{ text: '취소' }}
        confirmButtonProps={{
          text: '마감하기',
          onClick: () => closeVoteMutation.mutate(postId),
        }}
        showLaterButton={false}
      />,
    );
  };

  const handleEditPost = () => {
    navigate(`/polls/${postId}/edit`);
  };

  const handleDeletePost = () => {
    openDialog(
      <Dialog
        title="투표를 삭제할까요?"
        description="삭제하면 투표와 관련된 모든 데이터가 영구적으로 삭제됩니다."
        cancelButtonProps={{ text: '취소' }}
        confirmButtonProps={{
          text: '삭제하기',
          onClick: () => deletePostMutation.mutate(postId),
        }}
        showLaterButton={false}
      />,
    );
  };

  return (
    <div className="bg-white px-5 flex flex-col w-full mb-8">
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
        {isAuthor && postId && (
          <div className="ml-auto flex items-center">
            <ContextMenu>
              <ContextMenu.Trigger>
                <Icon name="More" size="medium" className="cursor-pointer" />
              </ContextMenu.Trigger>
              <ContextMenu.List>
                {status === 'PROGRESS' && (
                  <>
                    <ContextMenu.Item
                      icon={<Icon name="DeadLine" size="medium" />}
                      className="text-body-1"
                      onClick={handleClosePost}
                    >
                      투표 마감하기
                    </ContextMenu.Item>
                    <ContextMenu.Item
                      icon={<Icon name="Post" size="medium" />}
                      className="text-body-1"
                      onClick={handleEditPost}
                    >
                      투표 수정하기
                    </ContextMenu.Item>
                  </>
                )}
                <ContextMenu.Item
                  icon={<Icon name="Trash" size="medium" />}
                  className="text-body-1"
                  onClick={handleDeletePost}
                >
                  투표 삭제하기
                </ContextMenu.Item>
              </ContextMenu.List>
            </ContextMenu>
          </div>
        )}
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

        {/* 복수 투표 라벨 */}
        {pollOption.pollType === 'MULTIPLE' && (
          <Label variant="outline" colorVarient="progress" size="medium">
            복수 투표
          </Label>
        )}

        {/* 시간 설정으로 마감 시 nnn일 남음, 직접 마감으로 마감 시 직접 마감 라벨, 투표 수로 마감 시 n명 참여중 n명 참여 시 마감*/}
        <span
          className={cn('text-label-1', {
            'text-accent-900': status === 'CLOSED',
            'text-primary-500': status !== 'CLOSED',
          })}
        >
          {status !== 'CLOSED' &&
            closeOption.closeType === 'DATE' &&
            closeOption.closedAt && (
              <>{getDeadlineText(closeOption.closedAt)}</>
            )}
          {status !== 'CLOSED' && closeOption.closeType === 'SELF' && (
            <Label variant="outline" colorVarient="progress" size="medium">
              직접 마감
            </Label>
          )}
          {closeOption.closeType === 'VOTER' && (
            <>
              {status === 'CLOSED'
                ? `${voterCount}명 참여`
                : `${voterCount}명 참여 중 ${closeOption.maxVoterCount}명 참여 시 마감`}
            </>
          )}
        </span>
      </div>
      <div className="flex flex-col gap-[6px] mt-3 mb-2">
        <span className="text-heading-2">{title}</span>
        <span className="text-headline-2 ">{description}</span>
      </div>
      <div className="flex items-center justify-end gap-1 text-gray-600 text-body-2-long">
        <Icon name="DeadLineDarkGray" size="small" />
        {voterCount}
        <span className="px-[3px">·</span>
        <Icon name="MessageOutlineDarkGray" size="small" />
        {commentCount}
      </div>
    </div>
  );
}
