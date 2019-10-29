import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import {
  checkAnswer,
  confirmCorrectAnswer,
  loadQuestions,
  loadQuestionsSuccess,
  QuestionAnswerProps,
  rejectIncorrectAnswer,
} from 'src/app/actions/questions';
import { ApiService } from 'src/app/api.service';

@Injectable()
export class QuestionEffects {
  constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}

  readonly loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestions.type),
      switchMap(() =>
        this.apiService.getQuestions().pipe(map(questions => loadQuestionsSuccess({ questions }))),
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
}
