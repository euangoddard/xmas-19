import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { deactivateQuestion, loadQuestions } from 'src/app/actions/questions';
import { State } from 'src/app/reducers';
import { selectQuestions, selectQuestionsReady } from 'src/app/selectors/questions';
import { SwUpdatesService } from 'src/app/sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  readonly questions$ = this.store.pipe(select(selectQuestions));
  readonly ready$ = this.store.pipe(select(selectQuestionsReady));

  constructor(
    private readonly store: Store<State>,
    private readonly swUpdatesService: SwUpdatesService,
  ) {}

  @HostListener('click')
  deactivateQuestion(): void {
    this.store.dispatch(deactivateQuestion());
  }

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
    this.swUpdatesService.updateActivated.pipe(untilDestroyed(this)).subscribe(() => {
      console.log('activated update!');
    });
  }

  ngOnDestroy(): void {}
}
