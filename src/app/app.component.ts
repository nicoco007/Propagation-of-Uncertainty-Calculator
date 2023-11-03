import {Component} from '@angular/core';
import {Variable} from './variable';
import {Util} from './util';
import * as math from 'mathjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  resultVariable = 'R';
  equation = 'm/V';
  invalidInput = false;

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

  isEquationValid() {
    try {
      math.parse(this.equation);
      return true;
    } catch (ex) {
      return false;
    }
  }

  derivative(inRespectTo: string): string {
    if (this.equation && inRespectTo) {
      try {
        return math.derivative(this.equation, inRespectTo).toString();
      } catch (ex) {
        if (!(ex instanceof SyntaxError)) {
          console.log(ex);
        }

        return '';
      }
    }

    return '';
  }

  getResultFunction(): string {
    try {
      const result = this.getResult();
      return this.resultVariable + ' = ' + result.toString().replace(/e\+?(-?)(\d+)/, ' \\times 10^{$1$2}');
    } catch (ex) {
      if (!(ex instanceof SyntaxError)) {
        console.log(ex);
      }

      return '';
    }
  }

  getDeltaResultFunction(): string {
    try {
      const steps = [];
      const parts = [];
      const parts2 = [];

      const scope = {};

      for (let i = 0; i < this.variables.length; i++) {
        const variable = this.variables[i];
        const derivative = this.derivative(variable.name);

        if (!derivative) {
          return '';
        }

        parts.push(`\\left( \\frac{\\partial ${this.resultVariable}}{\\partial ${variable.name}} \\Delta ${variable.name} \\right)^2`);
        parts2.push('\\left( \\left( ' + derivative + ' \\right) \\cdot \\Delta ' + variable.name + ' \\right)^2');

        scope[variable.name] = variable.value;
      }

      steps.push('\\sqrt{' + parts.join(' + ') + '}');
      steps.push('\\sqrt{' + parts2.join(' + ') + '}');

      const result = this.getUncertainty();
      const exp = Util.getPowerOf10(result);

      steps.push(result);
      steps.push(Util.fixPrecision(result / Math.pow(10, exp)) + ' \\times 10^{' + exp + '}');
      steps.push(Util.fixPrecision(parseFloat(result.toPrecision(1)) / Math.pow(10, exp)) + ' \\times 10^{' + exp + '}');

      return `\\begin{aligned} \\Delta ${this.resultVariable} &= ${steps.join(' \\\\ &= ')} \\end{aligned}`;
    } catch (ex) {
      if (!(ex instanceof SyntaxError)) {
        console.log(ex);
      }

      return '';
    }
  }

  private getResult(): number {
    const scope = {};

    for (let i = 0; i < this.variables.length; i++) {
      scope[this.variables[i].name] = this.variables[i].value;
    }

    return Util.fixPrecision(math.evaluate(this.equation, scope));
  }

  private getUncertainty() {
    const scope = {};
    const parts = [];

    for (let i = 0; i < this.variables.length; i++) {
      const variable = this.variables[i];
      const derivative = math.derivative(this.equation, variable.name);
      parts.push('((' + derivative.toString() + ') * ' + variable.delta + ')^2');

      scope[variable.name] = variable.value;
    }

    const eq = 'sqrt(' + parts.join(' + ') + ')';

    return Util.fixPrecision(math.evaluate(eq, scope));
  }

  getResultWithUncertainty(): string {
    try {
      const result              = this.getResult();
      const uncertainty         = this.getUncertainty();
      const resultExp           = Util.getPowerOf10(result);
      const uncertaintyExp      = Util.getPowerOf10(uncertainty);
      const diffExp             = resultExp - uncertaintyExp;

      const roundedResult       = Math.round(result / Math.pow(10, uncertaintyExp)) / Math.pow(10, diffExp);
      const roundedUncertainty  = Math.round(uncertainty / Math.pow(10, uncertaintyExp)) / Math.pow(10, diffExp);

      return `${this.resultVariable} = \\left( ${roundedResult} \\pm ${roundedUncertainty} \\right) \\times 10^{${resultExp}}`;
    } catch (ex) {
      if (!(ex instanceof SyntaxError)) {
        console.log(ex);
      }

      return '';
    }
  }

  copyToClipboard() {
    let code = `\\[${this.getResultFunction()}\\]\\[${this.getDeltaResultFunction()}\\]\\[${this.getResultWithUncertainty()}\\]`;
    navigator.clipboard.writeText(code);
  }
}
