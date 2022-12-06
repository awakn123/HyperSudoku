
export const initialSudoku = [
  [0, 0, 0, 0, 2, 0, 0, 0, 0],
  [9, 7, 0, 0, 0, 0, 3, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 8],
  [0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 7, 1, 0, 0, 0, 3, 6],
  [2, 0, 0, 0, 6, 0, 5, 8, 0],
  [7, 0, 6, 0, 0, 0, 0, 9, 5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 4, 3, 0, 0, 1, 0],
];

class Number {
  row = -1;
  column = -1;
  value = 0;

  constructor(row, column, value) {
    this.row = row;
    this.column = column;
    this.value = value;
  }

  static convertRowNumberToNumber(rowNumber) {
    let row = Math.floor(rowNumber / 81);
    rowNumber %= 81;
    let col = Math.floor(rowNumber / 9);
    let value = 1 + (rowNumber % 9);
    return new Number(row, col, value);
  }
}

export class Matrix {
  matrix;
  deletedRows = [];
  deletedColumns = [];
  addLogs = () => {
  };

  constructor(first, addLogs) {
    if (first instanceof Array) {
      let sudoku = first;
      this.matrix = generateMatrix();
      this.addLogs = addLogs;
      this.initBySudoku(sudoku);
    } else if (first instanceof Matrix) {
      const {matrix, deletedRows, deletedColumns, addLogs} = first;
      this.matrix = matrix;
      this.deletedColumns = deletedColumns;
      this.deletedRows = deletedRows;
      this.addLogs = addLogs;
    }
  }

  initBySudoku(sudoku) {
    sudoku.forEach((row, ri) => {
      row.forEach((val, ci) => {
        if (val == 0) {
          return;
        }
        this.removeMatrix(new Number(ri, ci, val));
      });
    });
  }

  removeMatrix(number) {
    const choseRowIndex = number.row * 81 + number.column * 9 + (number.value - 1);
    const choseRow = this.matrix[choseRowIndex];
    let deleteRows = [choseRowIndex], deleteCols = [];
    choseRow.forEach((val, idx) => {
      if (val == 0) return;
      this.matrix.forEach((matrixRow, ri) => {
        if (matrixRow[idx] == 0)
          return;
        deleteRows.push(ri);
      });
      deleteCols.push(idx);
    });
    this.deletedRows = [...new Set([...this.deletedRows, ...deleteRows])];
    this.deletedColumns = [...new Set([...this.deletedColumns, ...deleteCols])];
  };

  chooseNumber() {
    if (this.deletedRows.length >= this.matrix.length
        || this.deletedColumns.length >= this.matrix[0].length)
      return;
    const rangeColumn = this.matrix[0].length - this.deletedColumns.length;
    let randomColumn = Math.floor(Math.random() * rangeColumn);
    let chooseColumn = Matrix.countActualLine(this.deletedColumns, randomColumn);
    let chooseRow = -1;
    for (let i = 0; i < this.matrix.length; i++) {
      // TODO if failed in this iteration, how could restart it?
      if (this.matrix[i][chooseColumn] == 1 &&
          this.deletedRows.findIndex((r) => r === i) < 0) {
        chooseRow = i;
        break;
      }
    }
    let number = Number.convertRowNumberToNumber(chooseRow);
    for (let col = 0; col < this.matrix[chooseRow].length; col++) {
      if (this.matrix[chooseRow][col] === 0 ||
          this.deletedColumns.findIndex((r) => r === col) >= 0) {
        continue;
      }
      for (let row = 0; row < this.matrix.length; row++) {
        if (this.matrix[row][col] === 0 ||
            this.deletedRows.findIndex((r) => r === row) >= 0) {
          continue;
        }
        this.deletedRows.push(row);
      }
      this.deletedColumns.push(col);
    }
    return number;
  }

  static countActualLine(deletedArray, randomNum) {
    let chooseLine = 0;
    for (let i = 0; i < deletedArray.length; i++) {
      let deletedLine = deletedArray[i];
      if (deletedLine - chooseLine > randomNum) {
        chooseLine += randomNum;
        break;
      } else {
        chooseLine++;
      }
    }
    return chooseLine;
  }

  static copyMatrix(matrix) {
    return new Matrix(matrix);
  }
}

/**
 * Generate an initial 729 * 384 matrix.
 * The first row means row 1 column 1, number is 1, marked as r1c1#1.
 * The second row means r1c1#2,...,
 * The tenth row means r1c2#1, etc.
 * The first 81 columns are cell constraints. Only one number can set in a cell.
 * The first column means r1c1 can only have 1 number, the second means r1c2, etc.
 * The second 81 columns are row constraints. Each of 1-9 appears once in a row.
 */
export const generateMatrix = function() {
  let matrix = new Array(729).fill(0).map((val, idx) => new Array(81).fill(0));
  // Cell Constraints: One Row, one column can only have one number.
  for (let i = 0; i < matrix.length; i++) {
    let column = Math.floor(i / 9);
    matrix[i][column] = 1;
  }
  // Row Constraints: there is only one number of 1-9 in a row.
  // TODO add more constraints.
  return matrix;
};
