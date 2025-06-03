import {
  MAX_POLL_TITLE_LENGTH,
  MAX_POLL_DESCRIPTION_LENGTH,
} from './constants';
import { CloseOption } from './types';

export class PollValidator {
  static validateTitle(title: string) {
    if (title.length === 0) return '제목을 입력해주세요.';
    if (title.length > MAX_POLL_TITLE_LENGTH)
      return `제목은 ${MAX_POLL_TITLE_LENGTH}자 이내여야 합니다.`;
    return null;
  }

  static validateDescription(description: string) {
    if (description.length === 0) return '내용을 입력해주세요.';
    if (description.length > MAX_POLL_DESCRIPTION_LENGTH)
      return `내용은 ${MAX_POLL_DESCRIPTION_LENGTH}자 이내여야 합니다.`;
    return null;
  }

  static validateCloseOptions(closeOptions: Partial<CloseOption>) {
    const { closeType, closedAt, maxVoterCount } = closeOptions;
    if (closeType === 'SELF') return null;
    if (closeType === 'TIME') {
      return this.validateClosedAt(closedAt ?? '');
    }
    if (closeType === 'VOTER_COUNT') {
      return this.validateMaxVoterCount(maxVoterCount ?? 0);
    }
    return null;
  }

  private static validateClosedAt(closedAt: string) {
    if (closedAt.length === 0) return '날짜와 시간을 모두 입력해 주세요.';
    return null;
  }

  private static validateMaxVoterCount(maxVoterCount: number) {
    if (maxVoterCount <= 0) return '최대 참여자 수는 0 이하일 수 없습니다.';
    return null;
  }
}
