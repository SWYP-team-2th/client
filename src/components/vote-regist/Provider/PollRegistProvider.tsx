import { useReducer, createContext } from 'react';
import { INITIAL_POLL_REGIST_DATA } from './constants';
import { PollRegistData, PollRegistState } from './types';

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
      payload: { index: number; imageUrl: string };
    }
  | { type: 'SET_POLL_CHOICE_ORDER'; payload: { index: number; order: number } }
  | {
      type: 'SET_POLL_CHOICE_TITLE';
      payload: { index: number; title: string };
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
    case 'SET_TITLE':
      return { ...state, data: { ...state.data, title: action.payload } };
    case 'SET_DESCRIPTION':
      return { ...state, data: { ...state.data, description: action.payload } };
    case 'ADD_POLL_CHOICE':
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: [
            ...state.data.pollChoices,
            { title: '', imageUrl: '', order: state.data.pollChoices.length },
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
          pollChoices: state.data.pollChoices.map((choice, index) =>
            index === action.payload.index
              ? { ...choice, imageUrl: action.payload.imageUrl }
              : choice,
          ),
        },
      };
    case 'SET_POLL_CHOICE_ORDER':
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: state.data.pollChoices.map((choice, index) =>
            index === action.payload.index
              ? { ...choice, order: action.payload.order }
              : choice,
          ),
        },
      };
    case 'SET_POLL_CHOICE_TITLE':
      return {
        ...state,
        data: {
          ...state.data,
          pollChoices: state.data.pollChoices.map((choice, index) =>
            index === action.payload.index
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
    case 'SET_CLOSE_TYPE':
      return {
        ...state,
        data: {
          ...state.data,
          closeOptions: {
            ...state.data.closeOptions,
            closeType: action.payload,
          },
        },
      };
    case 'SET_CLOSED_AT':
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
    case 'SET_MAX_VOTER_COUNT':
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
  setPollChoiceImage: (index: number, imageUrl: string) =>
    dispatch({ type: 'SET_POLL_CHOICE_IMAGE', payload: { index, imageUrl } }),
  setPollChoiceOrder: (index: number, order: number) =>
    dispatch({ type: 'SET_POLL_CHOICE_ORDER', payload: { index, order } }),
  setPollChoiceTitle: (index: number, title: string) =>
    dispatch({ type: 'SET_POLL_CHOICE_TITLE', payload: { index, title } }),
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
  setTitle: () => {},
  setDescription: () => {},
  addPollChoice: () => {},
  deletePollChoice: () => {},
  setPollChoiceImage: () => {},
  setPollChoiceOrder: () => {},
  setPollChoiceTitle: () => {},
  setPollType: () => {},
  setCommentActive: () => {},
  setCloseType: () => {},
  setClosedAt: () => {},
  setMaxVoterCount: () => {},
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
