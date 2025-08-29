import { describe, expect, it } from 'vitest';
import { getRemainedTimeText } from '../date';

describe('test getRemainedTimeText(): 날짜 문자열을 받아서 남은 시간을 텍스트로 반환하는 유틸 함수', () => {
  describe('과거 날짜 테스트 (suffix: "전")', () => {
    it('현재 시간으로부터 1분 미만 차이나는 경우 "방금 전"을 반환한다.', () => {
      // given
      const now = new Date();
      const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
      const input = thirtySecondsAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('방금 전');
    });

    it('현재 시간으로부터 1분 이상 1시간 미만 차이나는 경우 "n분 전"을 반환한다.', () => {
      // given
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
      const input = thirtyMinutesAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('30분 전');
    });

    it('현재 시간으로부터 1시간 이상 24시간 미만 차이나는 경우 "n시간 전"을 반환한다.', () => {
      // given
      const now = new Date();
      const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000);
      const input = fiveHoursAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('5시간 전');
    });

    it('현재 시간으로부터 24시간 이상 차이나는 경우 "n일 전"을 반환한다.', () => {
      // given
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      const input = threeDaysAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('3일 전');
    });
  });

  describe('다양한 suffix 테스트', () => {
    it('suffix가 "남음"인 경우 "n분 남음" 형태로 반환한다.', () => {
      // given
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
      const input = thirtyMinutesAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '남음' });

      // then
      expect(result).toBe('30분 남음');
    });

    it('suffix가 "전"인 경우 "n분 전" 형태로 반환한다.', () => {
      // given
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
      const input = thirtyMinutesAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('30분 전');
    });

    it('suffix가 "후"인 경우 "n분 후" 형태로 반환한다.', () => {
      // given
      const now = new Date();
      const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
      const input = thirtyMinutesAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '후' });

      // then
      expect(result).toBe('30분 후');
    });
  });

  describe('기본 기능 테스트', () => {
    it('ISO 8601 형식의 날짜 문자열을 올바르게 파싱한다.', () => {
      // given
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const input = oneHourAgo.toISOString(); // "2025-01-15T10:30:00.000Z" 형태

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('1시간 전');
    });

    it('정확한 시간 계산을 위해 소수점을 내림한다.', () => {
      // given
      const now = new Date();
      const ninetyMinutesAgo = new Date(now.getTime() - 90 * 60 * 1000);
      const input = ninetyMinutesAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('1시간 전'); // 1.5시간이 아닌 1시간으로 내림
    });

    it('경계값 테스트: 정확히 1분 차이', () => {
      // given
      const now = new Date();
      const exactlyOneMinuteAgo = new Date(now.getTime() - 60 * 1000);
      const input = exactlyOneMinuteAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('1분 전');
    });

    it('경계값 테스트: 정확히 1시간 차이', () => {
      // given
      const now = new Date();
      const exactlyOneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const input = exactlyOneHourAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('1시간 전');
    });

    it('경계값 테스트: 정확히 24시간 차이', () => {
      // given
      const now = new Date();
      const exactlyOneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const input = exactlyOneDayAgo.toISOString();

      // when
      const result = getRemainedTimeText({ dateString: input, suffix: '전' });

      // then
      expect(result).toBe('1일 전');
    });
  });
});
