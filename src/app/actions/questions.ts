import { createAction, props } from '@ngrx/store';
import { Questions } from 'src/app/models/question';

const prefix = `[Questions]`;

export const loadQuestions = createAction(`${prefix} load`);
export const loadQuestionsSuccess = createAction(
  `${prefix} load success`,
  props<{ questions: Questions }>(),
);
