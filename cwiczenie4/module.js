/**
 * module for sum Operation
 * @module module
 */

/**
  * @class Operation
  * @constructor
  * @param {int} x - first number
  * @param {int} y - second number
  */
class Operation {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /** @function sum
  */
  sum() {
    return (this.x + this.y);
  }
}

module.exports = { Operation };
