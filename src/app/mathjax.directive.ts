import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

declare const MathJax: any;

@Directive({
  selector: '[mathJax]'
})
export class MathJaxDirective implements OnChanges {
  @Input('mathJax') mathJax: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.style.display = 'none';
    this.el.nativeElement.innerHTML = '$$' + this.mathJax + '$$';
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.el.nativeElement], () => {
      this.el.nativeElement.style.display = 'block';
    });
  }
}
