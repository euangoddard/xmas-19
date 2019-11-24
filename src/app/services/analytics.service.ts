import { Inject, Injectable } from '@angular/core';
import { WINDOW } from 'src/app/app.tokens';

interface TagManagerWindow {
  gtag(...args: any[]): void;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(@Inject(WINDOW) private readonly windowRef: Window & TagManagerWindow) {}

  trackEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number,
  ): void {
    this.windowRef.gtag('send', {
      hitType: 'event',
      eventCategory,
      eventAction,
      eventLabel,
      eventValue,
    });
  }
}
