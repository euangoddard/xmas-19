import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { activateQuestion } from 'src/app/actions/questions';
import { Question } from 'src/app/models/question';
import { State } from 'src/app/reducers';
import { selectIsQuestionActive } from 'src/app/selectors/questions';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('popup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('0.25s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.25s', style({ opacity: 0, transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class QuestionComponent implements OnChanges {
  @Input() question: Question;

  isActive$: Observable<boolean>;

  constructor(private readonly store: Store<State>) {}

  @HostListener('click')
  activate(): void {
    this.store.dispatch(activateQuestion({ question: this.question }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const questionChange = changes['question'];
    if (questionChange && questionChange.currentValue) {
      this.isActive$ = this.store.pipe(
        select(selectIsQuestionActive, { question: questionChange.currentValue }),
      );
    }
  }
}
