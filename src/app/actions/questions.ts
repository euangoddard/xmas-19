import { createAction, props } from '@ngrx/store';
import { Question, Questions } from 'src/app/models/question';

const prefix = `[Questions]`;

export const loadQuestions = createAction(`${prefix} load`);
export const loadQuestionsSuccess = createAction(
  `${prefix} load success`,
  props<{ questions: Questions }>(),
);

export const activateQuestion = createAction(`${prefix} activate`, props<{ question: Question }>());
export const deactivateQuestion = createAction(`${prefix} deactivate`);

export const checkAnswer = createAction(`${prefix} check answer`, props<QuestionAnswerProps>());

export const clearIncorrectAnswer = createAction(`${prefix} clear incorrect answer`);

export const confirmCorrectAnswer = createAction(
  `${prefix} confirm correct answer`,
  props<QuestionAnswerProps>(),
);

export const rejectIncorrectAnswer = createAction(
  `${prefix} reject incorrect answer`,
  props<QuestionAnswerProps>(),
);

export interface QuestionAnswerProps {
  question: Question;
  answer: string;
}
