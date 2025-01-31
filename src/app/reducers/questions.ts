import { Action, createReducer, on } from '@ngrx/store';
import {
  activateQuestion,
  clearIncorrectAnswer,
  confirmCorrectAnswer,
  deactivateQuestion,
  loadAnswers,
  loadQuestionsSuccess,
  rejectIncorrectAnswer,
  resetAnswers,
  setHintVisibility,
} from 'src/app/actions/questions';
import { AnswersByEmoji } from 'src/app/models/answers';
import { Question, Questions } from 'src/app/models/question';

export interface QuestionsState {
  questions: Questions;
  ready: boolean;
  activeQuestion: null | Question;
  activeQuestionIncorrect: boolean;
  correctAnswers: AnswersByEmoji;
  showHints: boolean;
}

export const initialState: QuestionsState = {
  questions: [],
  ready: false,
  activeQuestion: null,
  activeQuestionIncorrect: false,
  correctAnswers: {},
  showHints: false,
};

const reducerFactory = createReducer(
  initialState,
  on(loadQuestionsSuccess, (state, action) => {
    return { ...state, questions: action.questions, ready: true };
  }),
  on(activateQuestion, (state, action) => {
    return { ...state, activeQuestion: action.question, activeQuestionIncorrect: false };
  }),
  on(deactivateQuestion, state => {
    return { ...state, activeQuestion: null, activeQuestionIncorrect: false };
  }),
  on(clearIncorrectAnswer, state => {
    return { ...state, activeQuestionIncorrect: false };
  }),
  on(confirmCorrectAnswer, (state, action) => {
    return {
      ...state,
      correctAnswers: { ...state.correctAnswers, [action.question.emojis]: action.answer },
    };
  }),
  on(rejectIncorrectAnswer, state => {
    return { ...state, activeQuestionIncorrect: true };
  }),
  on(setHintVisibility, (state, action) => {
    return { ...state, showHints: action.visible };
  }),
  on(loadAnswers, (state, action) => {
    return { ...state, correctAnswers: { ...state.correctAnswers, ...action.correctAnswers } };
  }),
  on(resetAnswers, state => {
    return { ...state, correctAnswers: {} };
  }),
);

export function questionsReducer(
  state: QuestionsState | undefined,
  action: Action,
): QuestionsState {
  return reducerFactory(state, action);
}
