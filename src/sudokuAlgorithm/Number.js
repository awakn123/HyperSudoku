export default class Number {
  row = -1;
  column = -1;
  value = 0;
  matrixLineNumber = -1;

  constructor(row, column, value) {
    this.row = row;
    this.column = column;
    this.value = value;
    this.matrixLineNumber = this.row * 81 + this.column * 9 + this.value - 1;
  }

  toString() {
    return `r${this.row + 1}c${this.column + 1}#${this.value}[${this.matrixLineNumber}]`;
  }

  toStringed() {
    return `r${this.row + 1}c${this.column + 1}#${this.value}`;
  }

  static convertRowNumberToNumber(rowNumber) {
    let row = Math.floor(rowNumber / 81);
    rowNumber %= 81;
    let col = Math.floor(rowNumber / 9);
    let value = 1 + (rowNumber % 9);
    return new Number(row, col, value);
  }
}
