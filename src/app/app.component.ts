import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadQuestions } from 'src/app/actions/questions';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
  }
}
