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

export const loadAnswers = createAction(
  `${prefix} load answers`,
  props<{ correctAnswers: { [emojis: string]: string } }>(),
);

export const clearIncorrectAnswer = createAction(`${prefix} clear incorrect answer`);

export const confirmCorrectAnswer = createAction(
  `${prefix} confirm correct answer`,
  props<QuestionAnswerProps>(),
);

export const rejectIncorrectAnswer = createAction(
  `${prefix} reject incorrect answer`,
  props<QuestionAnswerProps>(),
);

export const setHintVisibility = createAction(
  `${prefix} set hint visibility`,
  props<{ visible: boolean }>(),
);

export const resetAnswers = createAction(`${prefix} reset answers`);

export interface QuestionAnswerProps {
  question: Question;
  answer: string;
}
