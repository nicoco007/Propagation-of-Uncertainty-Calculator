export class Variable {
  name: string;
  value: number = null;
  delta: number = null;

  constructor(name: string = null, value: number = null, delta: number = null) {
    this.name = name;
    this.value = value;
    this.delta = delta;
  }
}
