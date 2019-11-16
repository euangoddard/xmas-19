import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from 'src/app/reducers';
import { AnswerCounts, selectAnswerCounts } from 'src/app/selectors/questions';

@Component({
  selector: 'win-celebration',
  templateUrl: './win.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinComponent {
  readonly emojis = ['🎁', '🎅🏻', '🕺🏼', '💃🏽', '🎄', '❄️', '☃️️', '✨', '🎆', '🤶🏻', '🎉', '🦃'];

  readonly hasWon$: Observable<boolean>;

  constructor(private readonly store: Store<State>) {
    this.hasWon$ = this.store.pipe(
      select(selectAnswerCounts),
      map((counts: AnswerCounts) => {
        return counts ? counts.correct >= counts.total : false;
      }),
    );
  }
}
