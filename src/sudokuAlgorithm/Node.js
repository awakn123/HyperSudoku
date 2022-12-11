
export default class Node {
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

