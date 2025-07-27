import { CloseOptions, PollOptions } from '@/types/post';

export interface PollFormData {
  title: string;
  description: string;
  pollChoices: PollChoice[];
  pollOption: PollOptions;
  closeOption: CloseOptions;
}

export interface PollChoice {
  id: string;
  title: string;
  imageUrl: string;
  file?: File;
  imageFileId?: number;
  order: number;
}

export interface PollRegistState {
  data: PollFormData;
  errors: Record<keyof PollFormData, string | null>;
  isValid: boolean;
}
