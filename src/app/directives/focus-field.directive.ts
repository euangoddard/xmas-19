import { AfterViewInit, Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { WINDOW } from 'src/app/app.tokens';

const FOOTER_HEIGHT = 70;

@Directive({
  selector: '[focusField]',
})
export class FocusFieldDirective implements AfterViewInit {
  private readonly element: HTMLInputElement;

  constructor(
    @Inject(WINDOW) private readonly windowRef: Window,
    elementRef: ElementRef<HTMLInputElement>,
  ) {
    this.element = elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.element.focus();
  }

  @HostListener('focus')
  ensureInView(): void {
    const { top, height } = this.element.getBoundingClientRect();
    if (top + height > this.windowRef.innerHeight - FOOTER_HEIGHT) {
      this.windowRef.scrollBy({ top: FOOTER_HEIGHT });
    }
  }
}
