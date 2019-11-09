import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get<T>(key: string, initial: T): T {
    const valueRaw = localStorage.getItem(key) || JSON.stringify(initial);
    let value: T;
    try {
      value = JSON.parse(valueRaw) || initial;
    } catch {
      value = initial;
    }
    return value;
  }

  set<T>(key: string, value: T): void {
    const valueEncoded = JSON.stringify(value);
    localStorage.setItem(key, valueEncoded);
  }
}
