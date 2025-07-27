import { useReducer, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IMAGE_TITLE_PLACEHOLDER, INITIAL_POLL_REGIST_DATA } from './constants';
import { PollFormFieldValidator } from './form-field-validate';
import { PollRegistData, PollRegistState } from './types';

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
  isValid: false,
};

type BasicAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string };

type PollChoiceAction =
  | { type: 'ADD_POLL_CHOICE' }
  | { type: 'DELETE_POLL_CHOICE'; payload: { id: string } }
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
    case 'SET_POLL_CHOICE_IMAGE': {
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
          pollOptions: { ...state.data.pollOptions, pollType: action.payload },
        },
      };
    }
    case 'SET_COMMENT_ACTIVE': {
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
    }
    case 'SET_CLOSE_TYPE': {
      const closeType = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          closeOptions: {
            ...state.data.closeOptions,
            closeType,
            ...(closeType === 'TIME' && { maxVoterCount: 0 }),
            ...(closeType === 'VOTER_COUNT' && { closedAt: '' }),
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
          closeOptions: {
            ...state.data.closeOptions,
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
          closeOptions: {
            ...state.data.closeOptions,
            maxVoterCount: action.payload,
          },
        },
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
  deletePollChoice: (id: string) =>
    dispatch({ type: 'DELETE_POLL_CHOICE', payload: { id } }),
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
    isValid: boolean;
  } & PollActions
>({
  data: initialPollRegistState.data,
  errors: initialPollRegistState.errors,
  isValid: initialPollRegistState.isValid,
  ...pollActions(() => {}),
});

export const PollProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(pollReducer, initialPollRegistState);

  const validator = new PollFormFieldValidator(state.data);
  const actions = pollActions(dispatch);

  return (
    <PollContext.Provider
      value={{
        data: state.data,
        errors: validator.errors,
        isValid: validator.isValid,
        ...actions,
      }}
    >
      <form
        className="pt-[55px] pb-[100px] px-6 relative h-full"
        onSubmit={(e) => e.preventDefault()}
      >
        {children}
      </form>
    </PollContext.Provider>
  );
};
