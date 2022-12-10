import React, {useContext} from 'react';
import {SudokuContext} from './SudokuProvider';
import './Matrix.css';

const Matrix = () => {
  const sudokuData = useContext(SudokuContext);
  const {matrix} = sudokuData;
  const createTr2 = () => {
    let array = [];
    array.push(<td width="200%" key={'test'}>{}</td>);
    //cell constraint
    array.push(<td colSpan={9} key={'k0'}>0</td>);
    for (let i = 1; i <= 7; i++) {
      array.push(<td colSpan={10} key={'kkk' + i}>{i}</td>);
    }
    array.push(<td colSpan={2} key={'kkk8'}>8</td>);
    //the three other constraint
    for (let i = 0; i <= 26; i++) {
      array.push(<td colSpan={9} key={`th_${i}`}>{i % 9 + 1}</td>);
    }
    return (
        <tr>
          {array}
        </tr>
    );
  };

  const createTr3 = () => {
    let array = [];
    array.push(<td width="200%" key={'Test'}>{}</td>);
    for (let i = 1; i <= 81; i++) {
      array.push(<td key={`td_${i}`}>{i % 10}</td>);
    }

    let array1 = [];
    for (let i = 1; i <= 9; i++)
      for (let j = 1; j <= 9; j++) {
        array1.push(<td key={`td_${i}${j}`}>{j % 10}</td>);
      }

    return (
        <tr>
          {array}{array1}{array1}{array1}
        </tr>
    );
  };

  const createTr4 = () => {
    return matrix.matrix.map((row, idx) => {
      return (
          <tr key={'tr' + idx} className={row.isDeleted ? 'deletedRow' : ''}>
            <td width="200%">{row.number.toStringed()}</td>
            {row.cells.map((val, cellIdx) => (
                <td key={'td' + idx + cellIdx}
                    className={matrix.matrixColumnsDesc[cellIdx].isDeleted ? 'deletedRow' : ''}
                    style={cellIdx == 114 ? {background: 'yellow'} : {}}
                >
                  {val}
                </td>
            ))}
          </tr>
      );
    });
  };

  return (
      <div>
        <table border="1">
          <tbody>
          <tr>
            <td width="200%">{}</td>
            <td colSpan={81}>cell constraints (only one of value in each of 81 cells)</td>
            <td colSpan={81}>row constraints (only one of 1-9 in each of 9 rows)</td>
            <td colSpan={81}>column constraints (only one of 1-9 in each of 9 columns</td>
            <td colSpan={81}>block constraints (only one of 1-9 in each of 9 columns</td>
          </tr>
          {createTr2()}
          {createTr3()}
          {createTr4()}
          </tbody>

        </table>
      </div>
  );
};

export default Matrix;