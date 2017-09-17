import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Variable} from '../variable';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.css']
})
export class VariableComponent {
  @Input() variable: Variable;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
