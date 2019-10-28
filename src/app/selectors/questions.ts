import { createSelector } from '@ngrx/store';
import { Question } from 'src/app/models/question';
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

interface QuestionProps {
  question: Question;
}

export const selectIsQuestionActive = createSelector(
  selectQuestionState,
  (state: QuestionsState, props: QuestionProps) => {
    return state.activeQuestion ? state.activeQuestion.emojis === props.question.emojis : false;
  },
);
