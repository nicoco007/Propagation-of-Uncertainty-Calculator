import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import * as katex from 'katex';

@Directive({
  selector: '[katex]'
})
export class KatexDirective implements OnChanges {
  @Input('katex') katex: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = katex.renderToString(this.katex);
  }
}
