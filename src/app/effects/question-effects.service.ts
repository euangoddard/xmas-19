import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  checkAnswer,
  confirmCorrectAnswer,
  loadAnswers,
  loadQuestions,
  loadQuestionsSuccess,
  QuestionAnswerProps,
  rejectIncorrectAnswer,
} from 'src/app/actions/questions';
import { AnswersByEmoji } from 'src/app/models/answers';
import { State } from 'src/app/reducers';
import { selectCorrectAnswers } from 'src/app/selectors/questions';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class QuestionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService,
    private readonly store: Store<State>,
    private readonly storage: StorageService,
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
      ofType(loadQuestionsSuccess.type),
      map(() => loadAnswers({ correctAnswers: this.storage.get<AnswersByEmoji>('answers', {}) })),
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

  readonly saveAnswers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(confirmCorrectAnswer.type),
        withLatestFrom(this.store.pipe(select(selectCorrectAnswers))),
        tap(([_, correctAnswers]) => {
          this.storage.set('answers', correctAnswers);
        }),
      ),
    { dispatch: false },
  );
}
