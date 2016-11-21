import { Directive, HostListener, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
	selector: '[exDirective]'
})
export class ExDirectiveDirective {
	constructor(el: ElementRef, renderer: Renderer) {
	   renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
	}

  @Input('confirm') onConfirmed: Function = () => {};

  @HostListener('click', ['$event'])
  confirmFirst() {
    const confirmed = window.confirm('Are you sure you want to do this?');

    if (confirmed) {
      this.onConfirmed();
    }
  };
}