import { Inject, Injectable } from '@angular/core';
import { WINDOW } from 'src/app/app.tokens';

interface TagManagerWindow {
  dataLayer: any[];
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(@Inject(WINDOW) private readonly windowRef: Window & TagManagerWindow) {
    this.windowRef.dataLayer = this.windowRef.dataLayer || [];
    this.track('js', new Date());
    this.track('config', 'UA-153077216-1');
  }

  trackEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel?: string,
    eventValue?: number,
  ): void {
    this.track('send', {
      hitType: 'event',
      eventCategory,
      eventAction,
      eventLabel,
      eventValue,
    });
  }

  private track(...args: readonly any[]): void {
    this.windowRef.dataLayer.push(args);
  }
}
