export const initialSudoku = [
    [0,0,0,0,2,0,0,0,0],
    [9,7,0,0,0,0,3,5,0],
    [0,0,0,0,0,0,0,6,8],
    [0,0,0,0,0,2,0,0,0],
    [0,0,7,1,0,0,0,3,6],
    [2,0,0,0,6,0,5,8,0],
    [7,0,6,0,0,0,0,9,5],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,4,3,0,0,1,0],
]
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
    for (let i=0; i<matrix.length; i++) {
        let column = Math.floor(i/9);
        matrix[i][column] = 1;
    }
    // Row Constraints: there is only one number of 1-9 in a row.
    // TODO add more constraints.
    return matrix;
}

export const initSudoku = function(sudoku, matrix) {
    const logs = [];
    return {sudoku, matrix, logs}
}