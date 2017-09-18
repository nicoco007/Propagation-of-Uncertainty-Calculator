export class Util {
  /**
   * Get the power of 10 necessary to convert a number to scientific notation
   * @param {number} num
   * @returns {number}
   */
  static getPowerOf10(num: number): number {
    // make sure we actually have a number and that it's not 0
    if (!isFinite(num) || isNaN(num) || num === 0) {
      return 0;
    }

    // since we want the number of times to divide/multiply by 10, we have
    // c / 10^x >= 1
    // c <= 10^x
    // log10(c) >= x
    // with c > 0 since log(x) when x <= 0 does not exist
    return Math.floor(Math.log10(Math.abs(num)));
  }

  /**
   * Round a number to a maximum of 10 decimals to avoid precision issues
   * @param {number} num
   * @returns {number}
   */
  static fixPrecision(num: number) {
    return Math.round(num * 1e10) / 1e10;
  }
}
