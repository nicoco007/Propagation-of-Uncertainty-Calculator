import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

declare const katex: any;

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
