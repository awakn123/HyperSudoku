import React, {useContext, useState} from 'react';
import {SudokuContext} from './SudokuProvider';
import './Matrix.css';
import './SudokuView.css'
import logo from './logo.png';
import GithubLogo from './GithubLogo.png';

const Matrix = () => {
  const sudokuData = useContext(SudokuContext);
  const {matrix} = sudokuData;
  const [cell, setCell] = useState(null);
  const createTr2 = () => {
    let array = [];
    array.push(<td width="56px" key={"test"}></td>);
    //cell constraint
    array.push(<td colSpan={9} key={"k1"}>0</td>);
    for (let i = 1; i <= 7; i++) {
      array.push(<td colSpan={10} key={'k2'+i}>{i}</td>);
    }
    array.push(<td colSpan={2} key={"k3"}>8</td>);
    //the three other constraint
    for (let i = 0; i <= 30; i++) {
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
    array.push(<td width="56px" key={"Test"}></td>);
    for (let i = 1; i <= 81; i++) {
      array.push(<td key={`td_${i}`}>{i % 10}</td>);
    }

    let array1 = [];
    for (let i = 1; i <= 31; i++)
      for (let j = 1; j <= 9; j++) {
        array1.push(<td key={`td_${i}${j}`}>{j % 10}</td>);
      }

    return (
        <tr>
          {array}{array1}
        </tr>
    );
  };

  const [hide, setHide] = useState(false)

  const createTr4 = () => {
    return matrix.matrix.map((row, idx) => {
      if (row.isDeleted && hide) {
        return null;
      }
      return (
          <tr key={'tr' + idx} className={row.isDeleted ? 'deletedRow' : ''}>
            <td width="56px">{row.number.toStringed()}</td>
            {row.cells.map((val, cellIdx) => {
              let selected = cell && (cell && cell.number == row.number || cell.col == cellIdx);
              return (
                  <td key={'td' + idx + cellIdx}
                      className={val == 1 ? 'one cp' : selected ? 'selected cp' : matrix.matrixColumnsDesc[cellIdx].isDeleted ? 'deletedRow cp' : 'cp'}
                      onClick={()=>setCell({number: row.number, col: cellIdx})}
                  >
                    {val}
                  </td>
              )
            })}
          </tr>
      );
    }).filter((tr) => !!tr);
  };

  return (
      <div class="matrix-page">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="NEU logo" height="60px" width="60px"/>
          </div>

          <div className="title">
            Hyper Sudoku Matrix
          </div>

          <div className="placeholder"></div>

          <div className="gitlogo">
            <a href="https://github.com/awakn123/HyperSudoku" target="_blank">
              <img src={GithubLogo} alt="Git logo" height="30px" width="30px"/>
            </a>
          </div>

          <div className="gitlink">
            <a href="https://github.com/awakn123/HyperSudoku" target="_blank">
              Project Page on Github
            </a>
          </div>
        </div>

        <div class="content matrix-area">
          <table>
            <tbody>
            <tr>
              <td>removed columns and rows:</td>
              <td className="deletedRow" style={{width: 50}}></td>
            </tr>
            <tr>
              <td>selected column and row:</td>
              <td className="selected" style={{width: 50}}></td>
            </tr>
            <tr>
              <td>cell with 1:</td>
              <td className="one" style={{width: 50}}></td>
            </tr>
            </tbody>
          </table>
          <div>
            <button onClick={() => setHide(!hide)} style={{width: "auto"}}>{hide ? "Show" : "Hide"} Removed Rows</button>
          </div>
          <table border="1">
            <tbody>
              <tr>
                <td width="56px">{}</td>
                <td colSpan={81}>cell constraints (only one of value in each of 81 cells)</td>
                <td colSpan={81}>row constraints (only one of 1-9 in each of 9 rows)</td>
                <td colSpan={81}>column constraints (only one of 1-9 in each of 9 columns</td>
                <td colSpan={81}>block constraints (only one of 1-9 in each of 9 block</td>
                <td colSpan={36}>hyper constraints(only one of 1-9 in each of 4 block)</td>
              </tr>
              {createTr2()}
              {createTr3()}
              {createTr4()}
            </tbody>
          </table>
        </div>

        <div className="footer">
          <div className="course">
            CS5800 Final Project
          </div>

          <div className="semester">
            2022 Fall Semester
          </div>

          <div className="placeholder"></div>

          <div className="author">
            Author (Alphabetical Order): Liyang Song, Na Yin, Xueyan Feng, Yun Cao
          </div>
        </div>
      </div>

  );
};

export default Matrix;