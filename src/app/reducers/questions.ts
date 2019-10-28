import { Action, createReducer, on } from '@ngrx/store';
import {
  activateQuestion,
  deactivateQuestion,
  loadQuestionsSuccess,
} from 'src/app/actions/questions';
import { Question, Questions } from 'src/app/models/question';

export interface QuestionsState {
  questions: Questions;
  ready: boolean;
  activeQuestion: null | Question;
}

export const initialState: QuestionsState = {
  questions: [],
  ready: false,
  activeQuestion: null,
};

const reducerFactory = createReducer(
  initialState,
  on(loadQuestionsSuccess, (state, action) => {
    return { ...state, questions: action.questions, ready: true };
  }),
  on(activateQuestion, (state, action) => {
    return { ...state, activeQuestion: action.question };
  }),
  on(deactivateQuestion, state => {
    return { ...state, activeQuestion: null };
  }),
);

export function questionsReducer(
  state: QuestionsState | undefined,
  action: Action,
): QuestionsState {
  return reducerFactory(state, action);
}
