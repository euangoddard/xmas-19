import { Question } from 'src/app/models/question';
import { initialState, QuestionsState } from 'src/app/reducers/questions';
import {
  selectIsQuestionActive,
  selectQuestions,
  selectQuestionsReady,
} from 'src/app/selectors/questions';

const QUESTION_1: Question = {
  emojis: 'abc',
  hint: 'Thing',
};
const QUESTION_2: Question = {
  emojis: 'xyz',
  hint: 'Animal',
};

describe('Question selectors', () => {
  describe('selectQuestions', () => {
    it('should return the value of the question state', () => {
      const questions = [QUESTION_1, QUESTION_2];
      const questionsState: QuestionsState = { ...initialState, questions };
      expect(selectQuestions.projector(questionsState)).toEqual(questions);
    });
  });

  describe('selectQuestionsReady', () => {
    it('should reflect the ready state', () => {
      const questions = [QUESTION_1, QUESTION_2];
      const questionsState: QuestionsState = { ...initialState, questions, ready: true };
      expect(selectQuestionsReady.projector(questionsState)).toBe(true);
    });

    it('should reflect the non-ready state', () => {
      const questionsState: QuestionsState = { ...initialState, ready: false };
      expect(selectQuestionsReady.projector(questionsState)).toBe(false);
    });
  });

  describe('selectIsQuestionActive', () => {
    const questions = [QUESTION_1, QUESTION_2];
    const questionsState: QuestionsState = {
      ...initialState,
      questions,
      activeQuestion: QUESTION_1,
    };

    it('should return true for the active question', () => {
      expect(selectIsQuestionActive.projector(questionsState, { question: QUESTION_1 })).toBe(true);
    });

    it('should return false for a non-active question', () => {
      expect(selectIsQuestionActive.projector(questionsState, { question: QUESTION_2 })).toBe(
        false,
      );
    });

    it('should use the emojis to discriminate', () => {
      expect(
        selectIsQuestionActive.projector(questionsState, {
          question: { ...QUESTION_1, hint: 'Other' },
        }),
      ).toBe(true);
    });

    it('should return false when there is no active question', () => {
      expect(
        selectIsQuestionActive.projector(
          { ...questionsState, activeQuestion: null },
          { question: QUESTION_1 },
        ),
      ).toBe(false);
    });
  });

  // describe('selectIsQuestionIncorrect', () => {
  //   it('should work', () => {
  //     fail('Implement me');
  //   })
  // })
});
