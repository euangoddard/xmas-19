import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { selectAnswerCounts } from 'src/app/selectors/questions';

@Component({
  selector: 'question-progress',
  templateUrl: './progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'progress',
  }
})
export class ProgressComponent {

  readonly counts$ = this.store.pipe(select(selectAnswerCounts));

  constructor(private readonly store: Store<State>) {}
}
