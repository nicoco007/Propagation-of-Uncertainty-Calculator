export class Util {
  static getExp(num: number): number {
    if (!isFinite(num) || isNaN(num) || num === 0) {
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

  static fixPrecision(num: number) {
    return Math.round(num * 1e10) / 1e10;
  }
}
