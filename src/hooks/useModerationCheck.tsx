import { useMutation } from '@tanstack/react-query';
import { requestModeration } from '@/api/moderation';
import Dialog from '@/components/common/Dialog/Dialog';
import { useDialog } from '@/components/common/Dialog/hooks';
import { PollFormData } from '@/components/poll/Provider/types';

interface ModerationCheckParams {
  pollData: PollFormData;
  onConfirm: () => void;
}

export function useModerationCheck() {
  const { openDialog, closeDialog } = useDialog();

  return useMutation({
    mutationFn: async ({ pollData }: ModerationCheckParams) => {
      // 제목, 내용, 이미지 이름을 모두 검사
      const textsToCheck = [
        pollData.title,
        pollData.description,
        ...pollData.pollChoices.map((choice) => choice.title),
      ].filter(Boolean);

      // 모든 텍스트를 검사하고 결과 수집 (에러가 발생해도 계속 진행)
      const moderationSettledResults = await Promise.allSettled(
        textsToCheck.map((text) => requestModeration(text)),
      );

      // 성공한 결과만 필터링
      const moderationResults = moderationSettledResults
        .filter((result) => result.status === 'fulfilled')
        .map(
          (result) =>
            (
              result as PromiseFulfilledResult<
                Awaited<ReturnType<typeof requestModeration>>
              >
            ).value,
        );

      // 욕설이 감지된 경우 찾기
      const detectedResults = moderationResults.filter(
        (result) => !result.isAllowed,
      );

      // 감지된 결과에서만 detectedWords 수집
      const allDetectedWords = detectedResults
        .flatMap((result) => {
          return result.detectedWords || [];
        })
        .filter((word) => word && word.trim().length > 0) // 빈 문자열 제거
        .filter((word, index, self) => self.indexOf(word) === index); // 중복 제거

      return {
        hasDetectedWords: detectedResults.length > 0,
        detectedWords: allDetectedWords,
      };
    },
    onSuccess: (result, variables) => {
      if (result.hasDetectedWords) {
        const inlineMessage =
          result.detectedWords.length > 0
            ? `비속어: ${result.detectedWords.map((word) => `"${word}"`).join(', ')}`
            : '';

        openDialog(
          <Dialog
            title="잠깐!"
            description="작성한 내용에 부적절한 표현이 포함되어 있어요."
            hasCloseButton={true}
            cancelButtonProps={{ text: '수정하기' }}
            confirmButtonProps={{
              text: '그대로 올리기',
              onClick: () => {
                closeDialog();
                variables.onConfirm();
              },
            }}
            showLaterButton={false}
            inlineMessage={inlineMessage}
          />,
        );
      } else {
        variables.onConfirm();
      }
    },
  });
}
