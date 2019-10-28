import { Action, createReducer, on } from '@ngrx/store';
import { loadQuestionsSuccess } from 'src/app/actions/questions';
import { Questions } from 'src/app/models/question';

export interface QuestionsState {
  questions: Questions;
  ready: boolean;
}

export const initialState: QuestionsState = {
  questions: [],
  ready: false,
};

const reducerFactory = createReducer(
  initialState,
  on(loadQuestionsSuccess, (state, action) => {
    return { ...state, questions: action.questions, ready: true };
  }),
);

export function questionsReducer(
  state: QuestionsState | undefined,
  action: Action,
): QuestionsState {
  return reducerFactory(state, action);
}
