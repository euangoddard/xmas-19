import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { map, mapTo, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  checkAnswer,
  confirmCorrectAnswer,
  deactivateQuestion,
  loadAnswers,
  loadQuestions,
  loadQuestionsSuccess,
  QuestionAnswerProps,
  rejectIncorrectAnswer,
  resetAnswers,
  setHintVisibility,
} from 'src/app/actions/questions';
import { AnswersByEmoji } from 'src/app/models/answers';
import { Question } from 'src/app/models/question';
import { State } from 'src/app/reducers';
import { selectAnswerCounts, selectCorrectAnswers } from 'src/app/selectors/questions';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

const SHOW_HINTS_STORAGE_KEY = 'show-hints';
const ANSWERS_STORAGE_KEY = 'answers';

@Injectable()
export class QuestionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService,
    private readonly store: Store<State>,
    private readonly storage: StorageService,
    private readonly analytics: AnalyticsService,
  ) {}

  readonly loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestions.type),
      switchMap(() =>
        this.apiService.getQuestions().pipe(map(questions => loadQuestionsSuccess({ questions }))),
      ),
    ),
  );

  readonly loadAnswers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestions.type),
      map(() =>
        loadAnswers({ correctAnswers: this.storage.get<AnswersByEmoji>(ANSWERS_STORAGE_KEY, {}) }),
      ),
    ),
  );

  readonly loadHintVisibility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestions.type),
      map(() =>
        setHintVisibility({ visible: this.storage.get<boolean>(SHOW_HINTS_STORAGE_KEY, false) }),
      ),
    ),
  );

  readonly checkAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAnswer.type),
      switchMap((action: Action & QuestionAnswerProps) => {
        return this.apiService.checkAnswer(action.question, action.answer).pipe(
          map(result => {
            if (result.isCorrect) {
              return confirmCorrectAnswer({ question: action.question, answer: result.answer });
            } else {
              return rejectIncorrectAnswer({ question: action.question, answer: action.answer });
            }
          }),
        );
      }),
    ),
  );

  readonly confirmCorrectAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmCorrectAnswer.type),
      mapTo(deactivateQuestion()),
    ),
  );

  readonly trackCorrectAnswer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(confirmCorrectAnswer.type),
        withLatestFrom(this.store.pipe(select(selectAnswerCounts))),
        tap(([action, counts]) => {
          if (counts) {
            this.analytics.trackEvent(
              'Questions',
              'Answer correctly',
              ((action as any).question as Question).emojis,
              counts.correct,
            );
          }
        }),
      ),
    { dispatch: false },
  );

  readonly saveAnswers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(confirmCorrectAnswer.type, resetAnswers.type),
        withLatestFrom(this.store.pipe(select(selectCorrectAnswers))),
        tap(([_, correctAnswers]) => {
          this.storage.set(ANSWERS_STORAGE_KEY, correctAnswers);
        }),
      ),
    { dispatch: false },
  );

  readonly saveHintVisibility$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setHintVisibility.type),
        tap(action => {
          const visible = (action as any)['visible'];
          this.storage.set(SHOW_HINTS_STORAGE_KEY, visible);
        }),
      ),
    { dispatch: false },
  );
}
