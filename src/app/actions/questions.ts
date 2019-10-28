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
