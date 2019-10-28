import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadQuestions, loadQuestionsSuccess } from 'src/app/actions/questions';
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
}
