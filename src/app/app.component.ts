import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
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

  constructor(private readonly store: Store<State>, private readonly resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
    this.addProgress();
  }

  private async addProgress() {
    const module = await import(/*webpackChunkName: 'progress-component' */'src/app/components/progress/progress.component');
    const ProgressComponent = module.ProgressComponent
    const factory = this.resolver.resolveComponentFactory(ProgressComponent);
    this.viewContainerRef.createComponent(factory);
  }
}
