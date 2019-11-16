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
import { Question } from 'src/app/models/question';
import { questionsReducer, QuestionsState } from 'src/app/reducers/questions';

const QUESTION_A: Question = {
  emojis: 'ABC',
  hint: 'Carol',
};

const QUESTION_B: Question = {
  emojis: 'DEF',
  hint: 'Film',
};

describe('Questions reducer', () => {
  it('should use the initial values', () => {
    expect(getInitialState()).toEqual({
      questions: [],
      ready: false,
      activeQuestion: null,
      activeQuestionIncorrect: false,
      correctAnswers: {},
      showHints: false,
    });
  });

  describe('loadQuestionsSuccess', () => {
    it('should mark the state as ready and set the questions', () => {
      const initialState = getInitialState();
      const questions = [QUESTION_A, QUESTION_B];
      const nextState = questionsReducer(initialState, loadQuestionsSuccess({ questions }));
      const expectedState: QuestionsState = { ...initialState, ready: true, questions };
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('activateQuestion', () => {
    let initialState: QuestionsState;
    beforeEach(() => {
      initialState = questionsReducer(
        getInitialState(),
        loadQuestionsSuccess({ questions: [QUESTION_A, QUESTION_B] }),
      );
    });

    it('should set the specified question as active', () => {
      const nextState: QuestionsState = questionsReducer(
        initialState,
        activateQuestion({ question: QUESTION_A }),
      );
      const expectedState: QuestionsState = { ...initialState, activeQuestion: QUESTION_A };
      expect(nextState).toEqual(expectedState);
    });

    it('should set the replace a question as active', () => {
      const state: QuestionsState = questionsReducer(
        initialState,
        activateQuestion({ question: QUESTION_A }),
      );
      const nextState: QuestionsState = questionsReducer(
        state,
        activateQuestion({ question: QUESTION_B }),
      );
      const expectedState: QuestionsState = { ...state, activeQuestion: QUESTION_B };
      expect(nextState).toEqual(expectedState);
    });

    it('should clear any incorrect state', () => {
      const state: QuestionsState = { ...initialState, activeQuestionIncorrect: true };
      const nextState: QuestionsState = questionsReducer(
        state,
        activateQuestion({ question: QUESTION_B }),
      );
      const expectedState: QuestionsState = {
        ...state,
        activeQuestion: QUESTION_B,
        activeQuestionIncorrect: false,
      };
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('deactivateQuestion', () => {
    let initialState: QuestionsState;
    beforeEach(() => {
      initialState = {
        ...getInitialState(),
        questions: [QUESTION_A, QUESTION_B],
        activeQuestion: QUESTION_A,
        ready: true,
      };
    });

    it('should set the active question to null', () => {
      const nextState = questionsReducer(initialState, deactivateQuestion());
      const expectedState: QuestionsState = { ...initialState, activeQuestion: null };
      expect(nextState).toEqual(expectedState);
    });

    it('should clear any incorrect state', () => {
      const state: QuestionsState = { ...initialState, activeQuestionIncorrect: true };
      const nextState = questionsReducer(state, deactivateQuestion());
      const expectedState: QuestionsState = { ...initialState, activeQuestion: null };
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('clearIncorrectAnswer', () => {
    let initialState: QuestionsState;
    beforeEach(() => {
      initialState = {
        ...getInitialState(),
        questions: [QUESTION_A, QUESTION_B],
        activeQuestion: QUESTION_A,
        activeQuestionIncorrect: true,
        ready: true,
      };
    });

    it('should clear any incorrect state', () => {
      const nextState = questionsReducer(initialState, clearIncorrectAnswer());
      const expectedState: QuestionsState = { ...initialState, activeQuestionIncorrect: false };
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('confirmCorrectAnswer', () => {
    let initialState: QuestionsState;
    beforeEach(() => {
      initialState = {
        ...getInitialState(),
        questions: [QUESTION_A, QUESTION_B],
        activeQuestion: QUESTION_A,
        ready: true,
      };
    });

    it('should store the correct answer', () => {
      const answer = 'Answer';
      const nextState = questionsReducer(
        initialState,
        confirmCorrectAnswer({ question: QUESTION_A, answer }),
      );
      const expectedState: QuestionsState = {
        ...initialState,
        correctAnswers: { [QUESTION_A.emojis]: answer },
      };
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('rejectIncorrectAnswer', () => {
    let initialState: QuestionsState;
    beforeEach(() => {
      initialState = {
        ...getInitialState(),
        questions: [QUESTION_A, QUESTION_B],
        activeQuestion: QUESTION_A,
        ready: true,
      };
    });

    it('should flag the incorrect answer', () => {
      const answer = 'Answer';
      const nextState = questionsReducer(
        initialState,
        rejectIncorrectAnswer({ question: QUESTION_A, answer }),
      );
      const expectedState: QuestionsState = {
        ...initialState,
        activeQuestionIncorrect: true,
      };
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('setHintVisibility', () => {
    it('should set the visibility to true', () => {
      const initialState = getInitialState();
      const nextState = questionsReducer(initialState, setHintVisibility({ visible: true }));
      expect(nextState).toEqual({ ...initialState, showHints: true });
    });

    it('should set the visibility to false', () => {
      const initialState: QuestionsState = { ...getInitialState(), showHints: true };
      const nextState = questionsReducer(initialState, setHintVisibility({ visible: false }));
      expect(nextState).toEqual({ ...initialState, showHints: false });
    });
  });

  describe('loadAnswers', () => {
    it('should populate the store', () => {
      const initialState = getInitialState();
      const correctAnswers: AnswersByEmoji = { ABC: '123', DEF: '456' };
      const nextState = questionsReducer(initialState, loadAnswers({ correctAnswers }));
      expect(nextState).toEqual({ ...initialState, correctAnswers });
    });
  });

  describe('resetAnswers', () => {
    it('should clear all the answers out', () => {
      const initialState = { ...getInitialState(), correctAnswers: { ABC: '123', DEF: '456' } };
      const nextState = questionsReducer(initialState, resetAnswers());
      expect(nextState).toEqual(getInitialState());
    });
  });
});

function getInitialState(): QuestionsState {
  return questionsReducer(undefined, { type: 'unknown' });
}
