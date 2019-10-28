import { createSelector } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { QuestionsState } from 'src/app/reducers/questions';

const selectQuestionState = (state: State) => state.questions;

export const selectQuestions = createSelector(
  selectQuestionState,
  (state: QuestionsState) => state.questions,
);

export const selectQuestionsReady = createSelector(
  selectQuestionState,
  (state: QuestionsState) => state.ready,
);
