import { createSelector } from '@ngrx/store';
import { size } from 'lodash-es';
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

const isQuestionActive = (state: QuestionsState, props: QuestionProps) => {
  return state.activeQuestion ? state.activeQuestion.emojis === props.question.emojis : false;
};

export const selectIsQuestionActive = createSelector(
  selectQuestionState,
  isQuestionActive,
);

export const selectIsQuestionIncorrect = createSelector(
  selectQuestionState,
  (state: QuestionsState, props: QuestionProps) => {
    return isQuestionActive(state, props) && state.activeQuestionIncorrect;
  },
);

export const selectQuestionCorrectAnswer = createSelector(
  selectQuestionState,
  (state: QuestionsState, props: QuestionProps) => {
    return state.correctAnswers[props.question.emojis] || null;
  },
);

export const selectAnswerCounts = createSelector<State, QuestionsState, AnswerCounts | null>(
  selectQuestionState,
  (state: QuestionsState) => {
    if (state.ready) {
      return {
        total: state.questions.length,
        correct: size(state.correctAnswers),
      };
    } else {
      return null;
    }
  },
);

export const selectShowHints = createSelector(
  selectQuestionState,
  (state: QuestionsState) => state.showHints,
);

export interface AnswerCounts {
  total: number;
  correct: number;
}
