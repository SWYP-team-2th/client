import {
  MAX_POLL_TITLE_LENGTH,
  MAX_POLL_DESCRIPTION_LENGTH,
} from './constants';
import { PollFormData } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<keyof PollFormData, string | null>;
}

export class PollFormFieldValidator {
  private _errors: Record<keyof PollFormData, string | null> = {
    title: null,
    description: null,
    pollChoices: null,
    pollOption: null,
    closeOption: null,
  };

  constructor(private readonly formData: PollFormData) {
    this.validateAll();
  }

  // Getter 메서드들 - 각 필드의 에러에 직접 접근
  get title() {
    return this._errors.title;
  }

  get description() {
    return this._errors.description;
  }

  get pollChoices() {
    return this._errors.pollChoices;
  }

  get pollOption() {
    return this._errors.pollOption;
  }

  get closeOption() {
    return this._errors.closeOption;
  }

  // 전체 에러 객체 반환
  get errors() {
    return this._errors;
  }

  // 전체 유효성 검사
  get isValid() {
    return Object.values(this._errors).every((error) => error === null);
  }

  // ValidationResult 형태로 반환 (기존 호환성)
  get validationResult(): ValidationResult {
    return {
      isValid: this.isValid,
      errors: this._errors,
    };
  }

  // 전체 검증 수행
  private validateAll() {
    this._errors = {
      title: this._validateTitle(this.formData.title),
      description: this._validateDescription(this.formData.description),
      pollChoices: this._validatePollChoices(this.formData.pollChoices),
      pollOption: this._validatePollOption(),
      closeOption: this._validateCloseOption(this.formData.closeOption),
    };
  }

  // 개별 필드 검증 메서드들 (내부용)
  private _validateTitle(title: string) {
    if (title.length === 0) return '제목을 입력해주세요.';
    if (title.length > MAX_POLL_TITLE_LENGTH)
      return `제목은 ${MAX_POLL_TITLE_LENGTH}자 이내여야 합니다.`;
    return null;
  }

  private _validateDescription(description: string) {
    if (description.length === 0) return '내용을 입력해주세요.';
    if (description.length > MAX_POLL_DESCRIPTION_LENGTH)
      return `내용은 ${MAX_POLL_DESCRIPTION_LENGTH}자 이내여야 합니다.`;
    return null;
  }

  private _validatePollChoices(pollChoices: PollFormData['pollChoices']) {
    if (pollChoices.length < 2)
      return '투표 항목은 최소 2개 이상이어야 합니다.';
    if (pollChoices.length > 10) return '투표 항목은 최대 10개까지 가능합니다.';

    for (const choice of pollChoices) {
      if (choice.title.trim().length === 0) {
        return '투표 항목의 제목을 입력해주세요.';
      }
    }

    // 최소 2개의 선택지에 이미지가 등록되어야 함
    const choicesWithImages = pollChoices.filter(
      (choice) => choice.imageUrl && choice.imageUrl.length > 0,
    );
    if (choicesWithImages.length < 2) {
      return '최소 2개의 선택지에 이미지를 등록해주세요.';
    }

    return null;
  }

  private _validatePollOption() {
    // pollOptions는 기본값이 설정되어 있으므로 추가 검증이 필요하지 않을 수 있습니다.
    // 필요에 따라 추가 검증 로직을 구현할 수 있습니다.
    return null;
  }

  private _validateCloseOption(closeOptions: PollFormData['closeOption']) {
    const { closeType, closedAt, maxVoterCount } = closeOptions;
    if (closeType === 'SELF') return null;
    if (closeType === 'DATE') {
      return this._validateClosedAt(closedAt ?? '');
    }
    if (closeType === 'VOTER') {
      return this._validateMaxVoterCount(maxVoterCount ?? 0);
    }
    return null;
  }

  private _validateClosedAt(closedAt: string) {
    if (closedAt.length === 0) return '날짜와 시간을 모두 입력해 주세요.';
    return null;
  }

  private _validateMaxVoterCount(maxVoterCount: number) {
    if (maxVoterCount <= 0) return '최대 참여자 수는 0 이하일 수 없습니다.';
    return null;
  }

  // 정적 메서드들 (기존 호환성 유지)
  static validateForm(formData: PollFormData): ValidationResult {
    const validator = new PollFormFieldValidator(formData);
    return validator.validationResult;
  }

  // 개별 필드 검증을 위한 정적 메서드들 (매번 인스턴스 생성하지 않음)
  static validateTitle(title: string): string | null {
    if (title.length === 0) return '제목을 입력해주세요.';
    if (title.length > MAX_POLL_TITLE_LENGTH)
      return `제목은 ${MAX_POLL_TITLE_LENGTH}자 이내여야 합니다.`;
    return null;
  }

  static validateDescription(description: string): string | null {
    if (description.length === 0) return '내용을 입력해주세요.';
    if (description.length > MAX_POLL_DESCRIPTION_LENGTH)
      return `내용은 ${MAX_POLL_DESCRIPTION_LENGTH}자 이내여야 합니다.`;
    return null;
  }

  static validatePollChoices(
    pollChoices: PollFormData['pollChoices'],
  ): string | null {
    if (pollChoices.length < 2)
      return '투표 항목은 최소 2개 이상이어야 합니다.';
    if (pollChoices.length > 10) return '투표 항목은 최대 10개까지 가능합니다.';

    for (const choice of pollChoices) {
      if (choice.title.trim().length === 0) {
        return '투표 항목의 제목을 입력해주세요.';
      }
    }

    // 최소 2개의 선택지에 이미지가 등록되어야 함
    const choicesWithImages = pollChoices.filter(
      (choice) => choice.imageUrl && choice.imageUrl.length > 0,
    );
    if (choicesWithImages.length < 2) {
      return '최소 2개의 선택지에 이미지를 등록해주세요.';
    }

    return null;
  }

  static validateCloseOptions(
    closeOptions: Partial<PollFormData['closeOption']>,
  ): string | null {
    const { closeType, closedAt, maxVoterCount } = closeOptions;
    if (closeType === 'SELF') return null;
    if (closeType === 'DATE') {
      if (!closedAt || closedAt.length === 0)
        return '날짜와 시간을 모두 입력해 주세요.';
      return null;
    }
    if (closeType === 'VOTER') {
      if (!maxVoterCount || maxVoterCount <= 0)
        return '최대 참여자 수는 0 이하일 수 없습니다.';
      return null;
    }
    return null;
  }

  // 데이터가 동일한지 확인하는 유틸리티 메서드
  private isDataEqual(data1: PollFormData, data2: PollFormData): boolean {
    if (data1.title !== data2.title) return false;
    if (data1.description !== data2.description) return false;
    if (data1.pollChoices.length !== data2.pollChoices.length) return false;
    for (let i = 0; i < data1.pollChoices.length; i++) {
      if (data1.pollChoices[i].title !== data2.pollChoices[i].title)
        return false;
    }
    if (data1.closeOption.closeType !== data2.closeOption.closeType)
      return false;
    if (data1.closeOption.closeType === 'DATE') {
      if (data1.closeOption.closedAt !== data2.closeOption.closedAt)
        return false;
    }
    if (data1.closeOption.closeType === 'VOTER') {
      if (data1.closeOption.maxVoterCount !== data2.closeOption.maxVoterCount)
        return false;
    }
    return true;
  }
}
