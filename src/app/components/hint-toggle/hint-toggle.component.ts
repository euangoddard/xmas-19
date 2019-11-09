import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { setHintVisibility } from 'src/app/actions/questions';
import { State } from 'src/app/reducers';
import { selectShowHints } from 'src/app/selectors/questions';

@Component({
  selector: 'hint-toggle',
  template: `
    <label class="hint-control">
      <input type="checkbox" [formControl]="hintsControl" /> Show hints
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintToggleComponent implements OnInit, OnDestroy {
  readonly hintsControl = new FormControl(false);

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(selectShowHints),
        untilDestroyed(this),
      )
      .subscribe(showHints => {
        this.hintsControl.setValue(showHints);
      });

    this.hintsControl.valueChanges.subscribe(value => {
      this.store.dispatch(setHintVisibility({ visible: value }));
    });
  }

  ngOnDestroy(): void {}
}
