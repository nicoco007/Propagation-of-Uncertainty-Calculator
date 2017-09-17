import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Variable} from './variable';

declare const math: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  equation = 'm/V';
  variables: Variable[] = [
    new Variable('V', 6.95e-6, 0.03e-6),
    new Variable('m', 1.87e-2, 0.01e-2)
  ];

  addVariable() {
    this.variables.push(new Variable());
  }

  deleteVariable(variable) {
    const index = this.variables.indexOf(variable);
    this.variables.splice(index, 1);
  }

  derivative(inRespectTo: string): string {
    if (this.equation && inRespectTo) {
      try {
        return math.derivative(this.equation, inRespectTo).toString();
      } catch (ex) {
        return '';
      }
    }

    return '';
  }

  resultFunction(): string {
    try {
      const scope = {};

      for (let i = 0; i < this.variables.length; i++) {
        scope[this.variables[i].name] = this.variables[i].value;
      }

      return 'R = ' + math.eval(this.equation, scope);
    } catch (ex) {
      return '';
    }
  }

  deltaResultFunction(): string {
    const steps = [];
    const parts = [];
    const parts2 = [];
    const parts3 = [];

    const scope = {};

    for (let i = 0; i < this.variables.length; i++) {
      const variable = this.variables[i];
      const derivative = this.derivative(variable.name);

      if (!derivative) {
        return '';
      }

      parts.push('\\left( \\frac{\\partial R}{\\partial ' + variable.name + '} \\Delta ' + variable.name + '\\right)^2');
      parts2.push('\\left( ' + derivative + ' \\cdot \\Delta ' + variable.name + '\\right)^2');

      parts3.push('(' + derivative.toString() + ' * ' + variable.delta + ')^2');

      scope[variable.name] = variable.value;
    }

    steps.push('\\sqrt{' + parts.join(' + ') + '}');
    steps.push('\\sqrt{' + parts2.join(' + ') + '}');

    try {
      const result = math.eval('sqrt(' + parts3.join(' + ') + ')', scope);
      steps.push(result);
      steps.push(parseFloat(result.toPrecision(1)).toExponential().replace(/e\+?(-?)(\d+)/, ' \\times 10^{$1$2}'));

      return '\\begin{align} \\Delta R &= ' + steps.join(' \\\\ &= ') + ' \\end{align}';
    } catch (ex) {
      return '';
    }
  }
}
