import { describe, expect, it } from 'vitest';
import { PollFormFieldValidator } from './form-field-validate';
import { CloseOption } from './types';

describe('test Form Validate Utils: 각 필드의 유효성 검사를 하는 유틸 함수를 테스트합니다.', () => {
  describe('test validateCloseOptions(): 마감 설정 유효성 검사 함수를 테스트합니다.', () => {
    it('closeType이 SELF이면 에러가 없어야 한다.', () => {
      // given
      const closeOptions: Partial<CloseOption> = {
        closeType: 'SELF',
        closedAt: '',
        maxVoterCount: 0,
      };

      // when
      const result = PollFormFieldValidator.validateCloseOptions(closeOptions);

      // then
      expect(result).toBe(null);
    });

    it('closeType이 TIME일 때, 시간과 날짜를 모두 입력하지 않으면 에러가 발생해야 한다.', () => {
      // given
      const closeOptions: Partial<CloseOption> = {
        closeType: 'TIME',
        closedAt: '',
      };

      // when
      const result = PollFormFieldValidator.validateCloseOptions(closeOptions);

      // then
      expect(result).toBe('날짜와 시간을 모두 입력해 주세요.');
    });

    it('closeType이 VOTER_COUNT일 때, maxVoterCount가 0 이하이면 에러가 발생해야 한다.', () => {
      // given
      const closeOptions: Partial<CloseOption> = {
        closeType: 'VOTER_COUNT',
        maxVoterCount: 0,
      };

      // when
      const result = PollFormFieldValidator.validateCloseOptions(closeOptions);

      // then
      expect(result).toBe('최대 참여자 수는 0 이하일 수 없습니다.');
    });
  });
});
