import { useReducer, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IMAGE_TITLE_PLACEHOLDER, INITIAL_POLL_REGIST_DATA } from './constants';
import { PollFormFieldValidator } from './form-field-validate';
import { PollFormData, PollRegistState } from './types';
import { CloseOptions } from '@/types/post';

type BasicAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string };

type PollChoiceAction =
  | { type: 'ADD_POLL_CHOICE' }
  | { type: 'DELETE_POLL_CHOICE'; payload: { id: string } }
  | {
      type: 'ADD_POLL_CHOICES';
      payload: { imageUrls: string[]; files: File[] };
    }
  | {
      type: 'SET_POLL_CHOICES_ORDER';
      payload: { newOrder: number[] };
    }
  | {
      type: 'SET_POLL_CHOICE_TITLE';
      payload: { id: string; title: string };
    };

type PollOptionAction =
  | { type: 'SET_POLL_TYPE'; payload: 'SINGLE' | 'MULTIPLE' }
  | { type: 'SET_COMMENT_ACTIVE'; payload: 'OPEN' | 'CLOSED' }
  | { type: 'SET_SCOPE'; payload: 'PUBLIC' | 'PRIVATE' };

type CloseOptionAction =
  | { type: 'SET_CLOSE_TYPE'; payload: CloseOptions['closeType'] }
  | { type: 'SET_CLOSED_AT'; payload: string }
  | { type: 'SET_MAX_VOTER_COUNT'; payload: number };

type PollAction =
  | BasicAction
  | PollChoiceAction
  | PollOptionAction
  | CloseOptionAction;

function pollFormReducer(
  state: PollRegistState,
  action: PollAction,
): PollRegistState {
  switch (action.type) {
    case 'SET_TITLE': {
      return { ...state, data: { ...state.data, title: action.payload } };
    }
    case 'SET_DESCRIPTION': {
      return { ...state, data: { ...state.data, description: action.payload } };
    }
    case 'ADD_POLL_CHOICE': {
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: [
            ...state.data.pollChoices,
            {
              id: uuidv4(),
              title:
                IMAGE_TITLE_PLACEHOLDER[
                  state.data.pollChoices
                    .length as keyof typeof IMAGE_TITLE_PLACEHOLDER
                ],
              imageUrl: '',
              order: state.data.pollChoices.length,
            },
          ],
        },
      };
    }
    case 'DELETE_POLL_CHOICE': {
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: state.data.pollChoices.filter(
            (choice) => choice.id !== action.payload.id,
          ),
        },
      };
    }
    case 'ADD_POLL_CHOICES': {
      const emptyChoices = state.data.pollChoices.filter(
        (choice) => !choice.imageUrl,
      );
      const remainingUrls = action.payload.imageUrls.slice(emptyChoices.length);
      const remainingFiles = action.payload.files.slice(emptyChoices.length);

      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: [
            // 기존 pollChoice들을 업데이트
            ...state.data.pollChoices.map((choice, index) => {
              if (
                index < emptyChoices.length &&
                action.payload.imageUrls[index]
              ) {
                return {
                  ...choice,
                  imageUrl: action.payload.imageUrls[index],
                  file: action.payload.files[index],
                };
              }
              return choice;
            }),
            // 남은 이미지들로 새로운 pollChoice 생성
            ...remainingUrls.map((imageUrl, index) => ({
              id: uuidv4(),
              title:
                IMAGE_TITLE_PLACEHOLDER[
                  (state.data.pollChoices.length +
                    index) as keyof typeof IMAGE_TITLE_PLACEHOLDER
                ],
              imageUrl: imageUrl,
              file: remainingFiles[index],
              order: state.data.pollChoices.length + index,
            })),
          ],
        },
      };
    }
    case 'SET_POLL_CHOICES_ORDER': {
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: state.data.pollChoices.sort(
            (a, b) =>
              action.payload.newOrder.indexOf(a.order) -
              action.payload.newOrder.indexOf(b.order),
          ),
        },
      };
    }
    case 'SET_POLL_CHOICE_TITLE': {
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: state.data.pollChoices.map((choice) =>
            choice.id === action.payload.id
              ? { ...choice, title: action.payload.title }
              : choice,
          ),
        },
      };
    }
    case 'SET_POLL_TYPE': {
      return {
        ...state,
        data: {
          ...state.data,
          pollOption: { ...state.data.pollOption, pollType: action.payload },
        },
      };
    }
    case 'SET_COMMENT_ACTIVE': {
      return {
        ...state,
        data: {
          ...state.data,
          pollOption: {
            ...state.data.pollOption,
            commentActive: action.payload,
          },
        },
      };
    }
    case 'SET_SCOPE': {
      return {
        ...state,
        data: {
          ...state.data,
          pollOption: { ...state.data.pollOption, scope: action.payload },
        },
      };
    }
    case 'SET_CLOSE_TYPE': {
      const closeType = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          closeOption: {
            ...state.data.closeOption,
            closeType,
            ...(closeType === 'VOTER' && { maxVoterCount: 0 }),
            ...(closeType === 'DATE' && { closedAt: '' }),
            ...(closeType === 'SELF' && { closedAt: '', maxVoterCount: 0 }),
          },
        },
      };
    }
    case 'SET_CLOSED_AT': {
      return {
        ...state,
        data: {
          ...state.data,
          closeOption: {
            ...state.data.closeOption,
            closedAt: action.payload,
          },
        },
      };
    }
    case 'SET_MAX_VOTER_COUNT': {
      return {
        ...state,
        data: {
          ...state.data,
          closeOption: {
            ...state.data.closeOption,
            maxVoterCount: action.payload,
          },
        },
      };
    }
    default:
      return state;
  }
}

const pollFormActions = (dispatch: React.Dispatch<PollAction>) => ({
  setTitle: (title: string) => dispatch({ type: 'SET_TITLE', payload: title }),
  setDescription: (description: string) =>
    dispatch({ type: 'SET_DESCRIPTION', payload: description }),
  addPollChoice: () => dispatch({ type: 'ADD_POLL_CHOICE' }),
  deletePollChoice: (id: string) =>
    dispatch({ type: 'DELETE_POLL_CHOICE', payload: { id } }),
  addPollChoices: (imageUrls: string[], files: File[]) =>
    dispatch({ type: 'ADD_POLL_CHOICES', payload: { imageUrls, files } }),
  setPollChoicesOrder: (newOrder: number[]) => {
    dispatch({
      type: 'SET_POLL_CHOICES_ORDER',
      payload: { newOrder },
    });
  },
  setPollChoiceTitle: (id: string, title: string) =>
    dispatch({ type: 'SET_POLL_CHOICE_TITLE', payload: { id, title } }),
  setPollType: (pollType: 'SINGLE' | 'MULTIPLE') =>
    dispatch({ type: 'SET_POLL_TYPE', payload: pollType }),
  setCommentActive: (commentActive: 'OPEN' | 'CLOSED') =>
    dispatch({ type: 'SET_COMMENT_ACTIVE', payload: commentActive }),
  setScope: (scope: 'PUBLIC' | 'PRIVATE') =>
    dispatch({ type: 'SET_SCOPE', payload: scope }),
  setCloseType: (closeType: CloseOptions['closeType']) =>
    dispatch({ type: 'SET_CLOSE_TYPE', payload: closeType }),
  setClosedAt: (closedAt: string) =>
    dispatch({ type: 'SET_CLOSED_AT', payload: closedAt }),
  setMaxVoterCount: (maxVoterCount: number) =>
    dispatch({ type: 'SET_MAX_VOTER_COUNT', payload: maxVoterCount }),
});

type PollFormActions = ReturnType<typeof pollFormActions>;

export const PollFormContext = createContext<
  {
    type: 'REGIST' | 'EDIT';
    data: PollFormData;
    errors: Record<keyof PollFormData, string | null>;
    isValid: boolean;
  } & PollFormActions
>({
  type: 'REGIST',
  data: INITIAL_POLL_REGIST_DATA,
  errors: {
    title: null,
    description: null,
    pollChoices: null,
    pollOption: null,
    closeOption: null,
  },
  isValid: false,
  ...pollFormActions(() => {}),
});

export const PollFormProvider = ({
  type,
  initialData,
  children,
}: {
  type: 'REGIST' | 'EDIT';
  initialData: PollFormData;
  children: React.ReactNode;
}) => {
  const initialState: PollRegistState = {
    data: initialData,
    errors: {
      title: null,
      description: null,
      pollChoices: null,
      pollOption: null,
      closeOption: null,
    },
    isValid: false,
  };

  const [state, dispatch] = useReducer(pollFormReducer, initialState);

  const validator = new PollFormFieldValidator(state.data);
  const actions = pollFormActions(dispatch);

  return (
    <PollFormContext.Provider
      value={{
        data: state.data,
        errors: validator.errors,
        isValid: validator.isValid,
        ...actions,
        type,
      }}
    >
      <form
        className="pt-[55px] pb-[100px] px-6 relative h-full"
        onSubmit={(e) => e.preventDefault()}
      >
        {children}
      </form>
    </PollFormContext.Provider>
  );
};
