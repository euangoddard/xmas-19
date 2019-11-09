import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { activateQuestion, checkAnswer } from 'src/app/actions/questions';
import { Question } from 'src/app/models/question';
import { State } from 'src/app/reducers';
import {
  selectIsQuestionActive,
  selectIsQuestionIncorrect,
  selectQuestionCorrectAnswer,
  selectShowHints,
} from 'src/app/selectors/questions';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('popup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate(250, style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(250, style({ opacity: 0, transform: 'translateY(-100%)' })),
      ]),
    ]),
    trigger('size', [
      state('shrink', style({ height: '*' })),
      state('grow', style({ height: '112px' })),
      transition('shrink <=> grow', animate(250)),
    ]),
  ],
})
export class QuestionComponent implements OnChanges {
  @Input() question: Question;

  readonly form: FormGroup;

  isActive$: Observable<boolean>;
  correctAnswer$: Observable<string | null>;
  isCorrect$: Observable<boolean>;
  isIncorrect$: Observable<boolean>;

  readonly showHints$ = this.store.pipe(select(selectShowHints));

  constructor(private readonly store: Store<State>, formBuilder: FormBuilder) {
    this.form = formBuilder.group({ answer: [null, [Validators.required]] });
  }

  @HostListener('click', ['$event'])
  activate(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(activateQuestion({ question: this.question }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const questionChange = changes['question'];
    if (questionChange && questionChange.currentValue) {
      const questionProps = { question: questionChange.currentValue };
      this.isActive$ = this.store.pipe(select(selectIsQuestionActive, questionProps));
      this.correctAnswer$ = this.store.pipe(select(selectQuestionCorrectAnswer, questionProps));
      this.isCorrect$ = this.correctAnswer$.pipe(map(a => !!a));
      this.isIncorrect$ = this.store.pipe(select(selectIsQuestionIncorrect, questionProps));
    }
  }

  checkAnswer(): void {
    this.store.dispatch(
      checkAnswer({ question: this.question, answer: this.form.value['answer'] }),
    );
  }
}
