import React, {useContext} from 'react';
import {SudokuContext} from './SudokuProvider';

const Matrix = () => {
  const sudokuData = useContext(SudokuContext);
  const {matrix} = sudokuData;
  const createTr = () => {
    let array = [];
    for (let i=0; i<81; i++) {
      array.push(<td>{i + 1}</td>)
    }
    return (
        <tr>
          {array}
        </tr>
    )
  }
  return (
      <div>
        <table>
          <tr>
            <td colSpan={81}>cell constraints (only one of value in each of 81 cells)</td>
            <td colSpan={81}>row constraints (only one of 1-9 in each of 9 rows)</td>
            <td colSpan={81}>column constraints (only one of 1-9 in each of 9 columns</td>
          </tr>
          {createTr()}
        </table>
        <table>
          {matrix.matrix.map((row, idx) => {
            return (
                <tr key={"tr" + idx}>
                  {row.cells.map((val, cellIdx)=><td key={"td" + idx + cellIdx}>{val}</td>)}
                </tr>
            );
          })}
        </table>
      </div>
  );
};

export default Matrix;