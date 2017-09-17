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

  getResultFunction(): string {
    try {
      return 'R = ' + this.getResult();
    } catch (ex) {
      return '';
    }
  }

  getDeltaResultFunction(): string {
    try {
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

      const result = this.getUncertainty();
      const exp = this.getExp(result);

      steps.push(result / Math.pow(10, exp) + ' \\times 10^{' + exp + '}');
      steps.push(result.toPrecision(1) / Math.pow(10, exp) + ' \\times 10^{' + exp + '}');

      return '\\begin{aligned} \\Delta R &= ' + steps.join(' \\\\ &= ') + ' \\end{aligned}';
    } catch (ex) {
      return '';
    }
  }

  private getResult(): number {
    const scope = {};

    for (let i = 0; i < this.variables.length; i++) {
      scope[this.variables[i].name] = this.variables[i].value;
    }

    return math.eval(this.equation, scope);
  }

  private getUncertainty() {
    const scope = {};
    const parts = [];

    for (let i = 0; i < this.variables.length; i++) {
      const variable = this.variables[i];
      const derivative = math.derivative(this.equation, variable.name);
      parts.push('(' + derivative.toString() + ' * ' + variable.delta + ')^2');

      scope[variable.name] = variable.value;
    }

    const eq = 'sqrt(' + parts.join(' + ') + ')';

    return math.eval(eq, scope);
  }

  getResultWithUncertainty(): string {
    try {
      const result = this.getResult();
      const uncertainty = this.getUncertainty();
      const resultExp = this.getExp(result);
      const uncertaintyExp = this.getExp(uncertainty);
      const diffExp = resultExp - uncertaintyExp;

      const a = Math.round(result / Math.pow(10, uncertaintyExp)) / Math.pow(10, diffExp);
      const b = Math.round(uncertainty / Math.pow(10, uncertaintyExp)) / Math.pow(10, diffExp);

      return 'R = \\left(' + a + ' \\pm ' + b + '\\right) \\times 10^' + resultExp;
    } catch (ex) {
      return '';
    }
  }

  getExp(num): number {
    if (num === 0) {
      return 0;
    }

    let abs = Math.abs(num);
    const sign = abs > 1 ? 1 : -1;
    let count = 0;

    if (abs > 1) {
      while (Math.round(abs) > 10) {
        abs = abs / 10;
        count++;
      }
    } else {
      while (Math.round(abs) < 1) {
        abs = abs * 10;
        count++;
      }
    }

    return count * sign;
  }
}
