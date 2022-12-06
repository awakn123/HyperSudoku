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
}

export class Matrix {
  matrix;
  deletedRows = [];
  deletedColumns = [];
  addLogs = () => {}
  constructor(sudoku, addLogs) {
    this.matrix = generateMatrix();
    this.addLogs = addLogs;
    this.initBySudoku(sudoku);
  }

  initBySudoku(sudoku) {
    sudoku.forEach((row, ri) => {
      row.forEach((val, ci) => {
        if (val == 0) {
          return;
        }
        this.removeMatrix(new Number(ri, ci, val));
      });
    })
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
    return new Number();
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
  let matrix = new Array(729).fill(0).map((val, idx) => new Array(384).fill(0));
  // Cell Constraints: One Row, one column can only have one number.
  for (let i = 0; i < matrix.length; i++) {
    let column = Math.floor(i / 9);
    matrix[i][column] = 1;
  }
  // Row Constraints: there is only one number of 1-9 in a row.
  // TODO add more constraints.
  return matrix;
};
