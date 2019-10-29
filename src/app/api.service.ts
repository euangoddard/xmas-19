import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Question, Questions } from 'src/app/models/question';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static url = '/.netlify/functions/questions';

  constructor(private readonly http: HttpClient) {}

  getQuestions(): Observable<Questions> {
    return this.http.get<Questions>(ApiService.url).pipe(pluck('questions'));
  }

  checkAnswer(question: Question, answer: string): Observable<CheckAnswerResult> {
    return this.http.post<CheckAnswerResult>(ApiService.url, { emojis: question.emojis, answer });
  }
}

interface CheckAnswerResult {
  isCorrect: boolean;
  answer: string;
}
