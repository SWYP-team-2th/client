import { useReducer, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IMAGE_TITLE_PLACEHOLDER, INITIAL_POLL_REGIST_DATA } from './constants';
import { PollRegistData, PollRegistState } from './types';
import { PollValidator } from './validate';

// TODO: 서버에서 공개 투표 추가하면 반영
const initialPollRegistState: PollRegistState = {
  data: INITIAL_POLL_REGIST_DATA,
  errors: {
    title: null,
    description: null,
    pollChoices: null,
    pollOptions: null,
    closeOptions: null,
  },
};

type BasicAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string };

type PollChoiceAction =
  | { type: 'ADD_POLL_CHOICE' }
  | { type: 'DELETE_POLL_CHOICE'; payload: { index: number } }
  | {
      type: 'SET_POLL_CHOICE_IMAGE';
      payload: { id: string; imageUrl: string };
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
  | { type: 'SET_COMMENT_ACTIVE'; payload: 'OPEN' | 'CLOSED' };

type CloseOptionAction =
  | { type: 'SET_CLOSE_TYPE'; payload: 'SELF' | 'TIME' | 'VOTER_COUNT' }
  | { type: 'SET_CLOSED_AT'; payload: string }
  | { type: 'SET_MAX_VOTER_COUNT'; payload: number };

type PollAction =
  | BasicAction
  | PollChoiceAction
  | PollOptionAction
  | CloseOptionAction;

function pollReducer(
  state: PollRegistState,
  action: PollAction,
): PollRegistState {
  switch (action.type) {
    case 'SET_TITLE': {
      const title = action.payload;
      const error = PollValidator.validateTitle(title);
      return {
        ...state,
        data: { ...state.data, title },
        errors: { ...state.errors, title: error },
      };
    }
    case 'SET_DESCRIPTION': {
      const description = action.payload;
      const error = PollValidator.validateDescription(description);
      return {
        ...state,
        data: { ...state.data, description },
        errors: { ...state.errors, description: error },
      };
    }
    case 'ADD_POLL_CHOICE':
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
    case 'DELETE_POLL_CHOICE':
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: state.data.pollChoices.filter(
            (_, index) => index !== action.payload.index,
          ),
        },
      };
    case 'SET_POLL_CHOICE_IMAGE':
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: state.data.pollChoices.map((choice) =>
            choice.id === action.payload.id
              ? { ...choice, imageUrl: action.payload.imageUrl }
              : choice,
          ),
        },
      };
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
    case 'SET_POLL_CHOICE_TITLE':
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
    case 'SET_POLL_TYPE':
      return {
        ...state,
        data: {
          ...state.data,
          pollOptions: { ...state.data.pollOptions, pollType: action.payload },
        },
      };
    case 'SET_COMMENT_ACTIVE':
      return {
        ...state,
        data: {
          ...state.data,
          pollOptions: {
            ...state.data.pollOptions,
            commentActive: action.payload,
          },
        },
      };
    case 'SET_CLOSE_TYPE': {
      const closeType = action.payload;
      const closeOptions = {
        ...state.data.closeOptions,
        closeType,
        ...(closeType === 'TIME' && { maxVoterCount: 0 }),
        ...(closeType === 'VOTER_COUNT' && { closedAt: '' }),
        ...(closeType === 'SELF' && { closedAt: '', maxVoterCount: 0 }),
      };
      const error = PollValidator.validateCloseOptions({
        closeType,
      });

      return {
        ...state,
        data: {
          ...state.data,
          closeOptions,
        },
        errors: { ...state.errors, closeOptions: error },
      };
    }
    case 'SET_CLOSED_AT': {
      const closedAt = action.payload;
      const error = PollValidator.validateCloseOptions({
        closeType: state.data.closeOptions?.closeType,
        closedAt,
      });

      return {
        ...state,
        data: {
          ...state.data,
          closeOptions: {
            ...state.data.closeOptions,
            closedAt,
          },
        },
        errors: { ...state.errors, closeOptions: error },
      };
    }
    case 'SET_MAX_VOTER_COUNT': {
      const maxVoterCount = action.payload;
      const error = PollValidator.validateCloseOptions({
        closeType: state.data.closeOptions?.closeType,
        maxVoterCount,
      });

      return {
        ...state,
        data: {
          ...state.data,
          closeOptions: { ...state.data.closeOptions, maxVoterCount },
        },
        errors: { ...state.errors, closeOptions: error },
      };
    }
    default:
      return state;
  }
}

const pollActions = (dispatch: React.Dispatch<PollAction>) => ({
  setTitle: (title: string) => dispatch({ type: 'SET_TITLE', payload: title }),
  setDescription: (description: string) =>
    dispatch({ type: 'SET_DESCRIPTION', payload: description }),
  addPollChoice: () => dispatch({ type: 'ADD_POLL_CHOICE' }),
  deletePollChoice: (index: number) =>
    dispatch({ type: 'DELETE_POLL_CHOICE', payload: { index } }),
  setPollChoiceImage: (id: string, imageUrl: string) =>
    dispatch({ type: 'SET_POLL_CHOICE_IMAGE', payload: { id, imageUrl } }),
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
  setCloseType: (closeType: 'SELF' | 'TIME' | 'VOTER_COUNT') =>
    dispatch({ type: 'SET_CLOSE_TYPE', payload: closeType }),
  setClosedAt: (closedAt: string) =>
    dispatch({ type: 'SET_CLOSED_AT', payload: closedAt }),
  setMaxVoterCount: (maxVoterCount: number) =>
    dispatch({ type: 'SET_MAX_VOTER_COUNT', payload: maxVoterCount }),
});

type PollActions = ReturnType<typeof pollActions>;

export const PollContext = createContext<
  {
    data: PollRegistData;
    errors: Record<keyof PollRegistData, string | null>;
  } & PollActions
>({
  data: initialPollRegistState.data,
  errors: initialPollRegistState.errors,
  ...pollActions(() => {}),
});

export const PollProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(pollReducer, initialPollRegistState);

  const actions = pollActions(dispatch);

  return (
    <PollContext.Provider
      value={{
        data: state.data,
        errors: state.errors,
        ...actions,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};
