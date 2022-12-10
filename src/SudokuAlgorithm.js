export const initialSudoku = [
  [0, 0, 0, 2, 8, 0, 0, 0, 6],
  [2, 9, 0, 0, 0, 0, 4, 5, 0],
  [4, 0, 6, 0, 9, 0, 0, 0, 0],
  [0, 0, 2, 1, 0, 0, 9, 0, 0],
  [0, 3, 0, 9, 0, 0, 7, 0, 0],
  [0, 7, 0, 8, 0, 0, 0, 0, 0],
  [8, 5, 0, 0, 7, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 0],
  [0, 0, 7, 0, 0, 2, 0, 1, 0],
];

class Number {
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

class Node {
  parent = null;
  children = [];
  matrixCol = -1;
  possibleMatrixRows = [];
  runningMatrix = [];// Matrix before number is chosen.

  number = null;
  fail = false;
  failedNumbers = [];

  addLogs = console.log;

  constructor(runningMatrix, addLogs, parent) {
    this.runningMatrix = runningMatrix;
    this.addLogs = addLogs;
    this.matrixCol = this.findLeastConstraintsColumn();
    this.possibleMatrixRows = this.findPossibleMatrixRows();
    if (this.matrixCol >= 0) {
      this.addLogs(`Possible rows: [${this.possibleMatrixRows.map(({number}) => number).join()}]`);
    }
    if (parent) {
      this.parent = parent;
      parent.children.push(this);
    }
  }

  findLeastConstraintsColumn() {
    if (this.runningMatrix.length === 0) return -1;
    let minCol = -1, min = 10;
    for (let j = 0; j < this.runningMatrix[0].cells.length; j++) {
      let count = 0;
      for (let i = 0; i < this.runningMatrix.length; i++) {
        if (this.runningMatrix[i].cells[j] === 1)
          count++;
      }
      if (count < min) {
        min = count;
        minCol = j;
      }
    }
    if (minCol === -1) {
      this.addLogs('There is no column could be chosen.');
    } else {
      this.addLogs(`Column ${minCol} is chosen, which has ${min} constraints in it.`);
    }
    return minCol;
  }

  findPossibleMatrixRows() {
    if (this.matrixCol == -1) return [];
    return this.runningMatrix.map((matrixRow) => {
      return matrixRow.cells[this.matrixCol] === 1 ? matrixRow : null;
    }).filter((val) => !!val);
  }

  chooseNumber() {
    let idx = Math.floor(Math.random() * this.possibleMatrixRows.length);
    let matrixRow = this.possibleMatrixRows[idx];
    this.number = matrixRow.number;
    this.possibleMatrixRows.splice(idx, 1);
  }

  /**
   * Failed, revert to empty.
   * If there is other possible values, this node could move forward, and will return this.
   * If there is no possible values, this node fails totally, and the parent with its value fails. Will return the parent for next revert.
   * @returns {Node|null}
   */
  revert() {
    this.failedNumbers.push(this.number);
    this.addLogs(`${this.number} is reverted.`);
    this.number = null;
    if (this.possibleMatrixRows.length === 0 && this.parent != null) {
      this.addLogs(`Return to parent node.`);
      this.parent.fail = true;
      return this.parent;
    } else {
      this.fail = false;
      return this;
    }
  }

  checkFail() {
    if (this.runningMatrix.length === 0) return true;
    if (this.matrixCol === -1) return true;
    if (this.possibleMatrixRows.length === 0 && this.number == null) {
      this.addLogs('There is no possible rows.');
      return true;
    }
    return this.fail;
  }

}

export class Matrix {
  matrix;
  runningMatrix;
  matrixColumnsDesc;
  runningMatrixColumnsDesc;
  root;
  addLogs = console.log;

  constructor(first) {
    if (first instanceof Matrix) {
      const {matrix, runningMatrix, root, addLogs, matrixColumnsDesc, runningMatrixColumnsDesc} = first;
      this.matrix = matrix;
      this.runningMatrix = runningMatrix;
      this.matrixColumnsDesc = matrixColumnsDesc
      this.runningMatrixColumnsDesc = runningMatrixColumnsDesc
      this.root = root;
      this.addLogs = addLogs;
    } else if (first instanceof Array) {
      let sudoku = first;
      this.matrix = generateMatrix();
      this.matrixColumnsDesc = generateMatrixColumnDesc(this.matrix)
      this.runningMatrixColumnsDesc = generateMatrixColumnDesc(this.matrix)
      this.runningMatrix = generateMatrix();
      this.root = this.initBySudoku(sudoku);
    }
  }

  initBySudoku(sudoku) {
    sudoku.forEach((row, ri) => {
      row.forEach((val, ci) => {
        if (val == 0) {
          return;
        }
        this.removeMatrix(new Number(ri, ci, val));
        new Node(this.runningMatrix, this.addLogs);
      });
    });
    return new Node([...this.runningMatrix], this.addLogs);
  }

  removeMatrix(number) {
    this.addLogs("remove number: " + number)
    const choseRow = this.runningMatrix.find((row) => row.number.matrixLineNumber === number.matrixLineNumber);
    let deleteRows = [choseRow], deleteCols = [];
    choseRow.cells.forEach((val, idx) => {
      if (val == 0) return;
      this.runningMatrix = this.runningMatrix.filter((matrixRow) => {
        if (matrixRow.cells[idx] == 0)
          return true;
        deleteRows.push(matrixRow);
        this.matrix[matrixRow.number.matrixLineNumber].isDeleted = true;
        return false;
      });
      deleteCols.push(idx);
    });
    this.runningMatrix = this.runningMatrix.map((matrixRow) => {
      return {...matrixRow, cells: matrixRow.cells.filter((val, idx) => deleteCols.indexOf(idx) < 0)};
    });
    let deletedColumnDesc = this.runningMatrixColumnsDesc.filter((val, idx)=> deleteCols.indexOf(idx) >= 0);
    this.runningMatrixColumnsDesc = this.runningMatrixColumnsDesc.filter((val, idx)=> deleteCols.indexOf(idx) < 0);
    this.matrixColumnsDesc.forEach((col) => {
      if (deletedColumnDesc.some((del) => del.index === col.index)) {
        col.isDeleted = true
      }
    })
    this.addLogs(`${deleteCols.length} columns in matrix(${deletedColumnDesc.join()}) are deleted.`);
    this.addLogs(`${deleteRows.length} rows in matrix(${deleteRows.map(({number}) => number).join()}) are deleted.`);
    return deleteRows;
  }

  chooseNumber(node) {
    let nextNode = node.number ? new Node(this.runningMatrix, this.addLogs, node) : node;
    if (nextNode.checkFail()) {
      this.addLogs("Cannot find next number.");
      return nextNode;
    }
    nextNode.chooseNumber();
    this.addLogs(`${nextNode.number} is chosen.`);
    const deletedRows = this.removeMatrix(nextNode.number);
    nextNode.fail = this.checkFail(deletedRows);
    return nextNode;
  }

  revert(node) {
    this.runningMatrix = node.runningMatrix;
  }

  /**
   * Check whether this branch fails.
   * By checking all sudoku cells relating to deleted rows can be filled with other values.
   * @param deletedRows
   * @returns {boolean}
   */
  checkFail(deletedRows) {
    for (let i = 0; i < deletedRows.length; i++) {
      let {number} = deletedRows[i];
      let start = number - number % 9, end = start + 9;
      let fail = true;
      for (let j = start; j < end; j++) {
        if (!this.matrix[j].isDeleted) {
          fail = false;
          break;
        }
      }
      if (fail) {
        this.addLogs(`Failed Attempt: The cell r${number.row}c${number.column} can not be filled with any numbers.`);
        return true;
      }
    }
    return false;
  }

  checkSuccess() {
    return this.runningMatrix.length === 0;
  }

  static copyMatrix(matrix) {
    return new Matrix(matrix);
  }
}

/**
 * Generate an initial 729 * 324 matrix.
 * The first row means row 1 column 1, number is 1, marked as r1c1#1.
 * The second row means r1c1#2,...,
 * The tenth row means r1c2#1, etc.
 * The first 81 columns are cell constraints. Only one number can set in a cell.
 * The first column means r1c1 can only have 1 number, the second means r1c2, etc.
 * The second 81 columns are row constraints. Each of 1-9 appears once in a row.
 */
export const generateMatrix = function() {
  let matrix = new Array(729).fill(0).map((val, idx) =>
      ({
        number: Number.convertRowNumberToNumber(idx),
        cells: new Array(324 + 36).fill(0),
      }));
  // Cell Constraints: One Row, one column can only have one number.
  for (let i = 0; i < matrix.length; i++) {
    let column = Math.floor(i / 9);
    matrix[i].cells[column] = 1;
  }
  // Row Constraints: there is only one number of 1-9 in a row.
  for (let j = 0; j < 729; j++) {
    let x = j % 9;
    let y = Math.floor(j / 81);
    matrix[j].cells[x + 81 + y * 9] = 1;
  }

  // Column Constraints: there is only one number of 1-9 in a column.
  for (let j = 0; j < 729; j++) {
    let x = j % 81;
    matrix[j].cells[x + 162] = 1;
  }

  // Block Constraints: there is only one number of 1-9 in a block.
  for (let j = 0; j < 729; j++) {
    let a = j % 9;
    let b = Math.floor(j / 27 % 3);
    let c = Math.floor(j / 243);
    matrix[j].cells[a + 243 + 9 * (b + (3 * c))] = 1;
  }

  // Hyper-Block Constraints: there is only one number of 1-9 in a Hyper-Block.
  // Takes 36 Columns

  // First Hyper-Block
  for (let j = 90; j < 117; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324] = 1;
  }

  for (let j = 171; j < 198; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324] = 1;
  }

  for (let j = 252; j < 279; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324] = 1;
  }

  // Second Hyper-Block
  for (let j = 126; j < 153; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 9] = 1;
  }

  for (let j = 207; j < 234; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 9] = 1;
  }

  for (let j = 288; j < 315; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 9] = 1;
  }

  // Third Hyper-Block
  for (let j = 414; j < 414 + 27; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 18] = 1;
  }

  for (let j = 414 + 81; j < 414 + 81 + 27; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 18] = 1;
  }

  for (let j = 414 + 162; j < 414 + 162 + 27; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 18] = 1;
  }

  // Fourth Hyper-Block
  for (let j = 450; j < 450 + 27; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 27] = 1;
  }

  for (let j = 450 + 81; j < 450 + 81 + 27; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 27] = 1;
  }

  for (let j = 450 + 162; j < 450 + 162 + 27; j++) {
    let a = j % 9;
    matrix[j].cells[a + 324 + 27] = 1;
  }
  return matrix;
};

class ColumnDesc {
  desc;
  constraintNumbers;
  index;
  isDeleted;

  constructor(matrix, i, desc) {
    this.index = i;
    this.constraintNumbers = matrix.filter((row) => row.cells[i] == 1).map((row) => row.number);
    this.desc = desc;
  }

  toString() {
    return `${this.desc}[${this.index}]`
  }
}

const generateMatrixColumnDesc = (matrix) => {
  let result = new Array(324 + 36);
  for (let i = 0; i < result.length; i++) {
    let desc;
    if (i < 81)
      desc = 'cell constraints';
    else if (i < 162)
      desc = 'row constraints';
    else if (i < 243)
      desc = 'column constraints';
    else if (i < 324)
      desc = 'box constraints';
    else
      desc = 'hyper constraints';
    result[i] = new ColumnDesc(matrix, i, desc);
  }
  return result;
};
