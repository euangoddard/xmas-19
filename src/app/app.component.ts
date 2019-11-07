import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadQuestions } from 'src/app/actions/questions';
import { State } from 'src/app/reducers';
import { selectQuestions, selectQuestionsReady } from 'src/app/selectors/questions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly questions$ = this.store.pipe(select(selectQuestions));
  readonly ready$ = this.store.pipe(select(selectQuestionsReady));

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
  }
}
