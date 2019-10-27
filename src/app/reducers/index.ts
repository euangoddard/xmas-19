import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { questionsReducer, QuestionsState } from 'src/app/reducers/questions';
import { environment } from '../../environments/environment';

export interface State {
  questions: QuestionsState;
}

export const reducers: ActionReducerMap<State> = {
  questions: questionsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
