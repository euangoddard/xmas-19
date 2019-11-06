import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxAliasModule } from 'ngx-alias';
import { QuestionEffects } from 'src/app/effects/question-effects.service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { QuestionComponent } from './components/question/question.component';
import { metaReducers, reducers } from './reducers';

@NgModule({
  declarations: [AppComponent, QuestionComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgxAliasModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([QuestionEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
