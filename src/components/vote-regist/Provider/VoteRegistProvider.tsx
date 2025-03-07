import { createContext, useEffect, useState } from 'react';
import {
  MAX_IMAGE_COUNT,
  MAX_IMAGE_SIZE,
  MINIMUM_IMAGE_COUNT,
} from '../constants';
import useToast from '@/components/common/Toast/hooks';

interface Field<T> {
  value: T;
  errorMessage: string | null;
}

interface ImageFile {
  file: File;
  previewUrl: string;
}

interface VoteRegistState {
  description: Field<string | null>;
  images: Field<ImageFile[]>;
  voteType: Field<'SINGLE' | 'MULTIPLE' | null>;
  scope: Field<'PUBLIC' | 'PRIVATE'>;
}

interface VoteRegistContextType {
  state: VoteRegistState;
  setDescription: (description: string) => void;
  handleImageSelect: (files: File[]) => void;
  removeImage: (name: string) => void;
  setVoteType: (voteType: 'SINGLE' | 'MULTIPLE' | null) => void;
  setScope: (scope: 'PUBLIC' | 'PRIVATE') => void;
  isFormValid: boolean;
}

const initialState: VoteRegistState = {
  description: {
    value: null,
    errorMessage: `설명을 입력해주세요.`,
  },
  images: {
    value: [],
    errorMessage: `이미지를 ${MINIMUM_IMAGE_COUNT}장 이상 업로드해주세요.`,
  },
  voteType: {
    value: null,
    errorMessage: '투표 설정 방식을 선택해주세요.',
  },
  scope: {
    value: 'PRIVATE',
    errorMessage: null,
  },
};

export const VoteRegistContext = createContext<VoteRegistContextType | null>(
  null,
);

export default function VoteRegistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToast();
  const [state, setState] = useState<VoteRegistState>(initialState);

  useEffect(() => {
    return () => {
      state.images.value.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, []);

  const validateState = (newState: VoteRegistState): VoteRegistState => ({
    description: {
      ...newState.description,
      errorMessage:
        (newState.description.value?.length ?? 0)
          ? null
          : '설명을 입력해주세요.',
    },
    images: {
      ...newState.images,
      errorMessage:
        newState.images.value.length < MINIMUM_IMAGE_COUNT
          ? `이미지를 ${MINIMUM_IMAGE_COUNT}장 이상 업로드해주세요.`
          : newState.images.value.length > MAX_IMAGE_COUNT
            ? `이미지를 ${MAX_IMAGE_COUNT}장 이하로 업로드해주세요.`
            : null,
    },
    voteType: {
      ...newState.voteType,
      errorMessage:
        newState.voteType.value === null
          ? '투표 설정 방식을 선택해주세요.'
          : null,
    },
    scope: {
      ...newState.scope,
      errorMessage: null,
    },
  });

  const setDescription = (text: string) => {
    setState((prev) =>
      validateState({
        ...prev,
        description: {
          ...prev.description,
          value: text,
        },
      }),
    );
  };

  const handleImageSelect = (files: File[]) => {
    const remainingSlots = MAX_IMAGE_COUNT - state.images.value.length;

    if (files.length > remainingSlots) {
      toast.warning({
        title: `선택하신 ${files.length}장의 이미지 중 처음 ${remainingSlots}장만 추가됩니다.`,
      });
    }

    const filesToAdd = files
      .slice(0, remainingSlots)
      .filter((file) => {
        if (!file.type.startsWith('image/')) {
          toast.error({
            title: '이미지 파일만 업로드 가능합니다.',
          });
          return false;
        }

        if (file.size > MAX_IMAGE_SIZE) {
          toast.error({
            title: '파일 크기는 5MB 이하여야 합니다.',
          });
          return false;
        }

        return true;
      })
      .map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

    setState((prev) =>
      validateState({
        ...prev,
        images: {
          ...prev.images,
          value: [...prev.images.value, ...filesToAdd],
        },
      }),
    );
  };

  const removeImage = (name: string) => {
    setState((prev) => {
      const imageToRemove = prev.images.value.find(
        (img) => img.file.name === name,
      );
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return validateState({
        ...prev,
        images: {
          ...prev.images,
          value: prev.images.value.filter((img) => img.file.name !== name),
        },
      });
    });
  };

  const setVoteType = (voteType: 'SINGLE' | 'MULTIPLE' | null) => {
    setState((prev) =>
      validateState({
        ...prev,
        voteType: { ...prev.voteType, value: voteType },
      }),
    );
  };

  const setScope = (scope: 'PUBLIC' | 'PRIVATE') => {
    setState((prev) =>
      validateState({ ...prev, scope: { ...prev.scope, value: scope } }),
    );
  };

  const isFormValid =
    state.description.errorMessage === null &&
    state.images.errorMessage === null &&
    state.voteType.errorMessage === null;

  return (
    <VoteRegistContext.Provider
      value={{
        state,
        setDescription,
        handleImageSelect,
        removeImage,
        setVoteType,
        setScope,
        isFormValid,
      }}
    >
      {children}
    </VoteRegistContext.Provider>
  );
}
