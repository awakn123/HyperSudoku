import React, {useContext} from 'react';
import './SudokuView.css';
import {SudokuContext} from './SudokuProvider';
import logo from './logo.png';
import GithubLogo from './GithubLogo.png';

const SudokuView = () => {
  const sudokuData = useContext(SudokuContext);
  const {
    data, logs, node, next, start, pause, skipToStart,
  } = sudokuData;
  const {number} = node;
  const sudokuTable = () => {
    console.log("number", number);
    const table = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(
            <td key={`td_${i}${j}`}
                className={number && number.row === i && number.column === j ? 'curCell' : ''}
            >
              {data[i][j] === 0 ? '' : data[i][j]}
            </td>);
      }
      table.push(<tr key={`tr_${i}`}>{row}</tr>);
    }
    return table;
  };

  return (
      <div className={'sudoku-view'}>
        <div className="header">
          <div className="logo">
            <img src={logo} alt="NEU logo" height="60px" width="60px"/>
          </div>

          <div className="title">
            Hyper Sudoku Solver
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

        <div className="content">
          <div className="column left">
            <div className="sudoku">
              <table className="table">
                <tbody>
                {sudokuTable()}
                </tbody>
              </table>
            </div>
          </div>

          <div className="column middle">
            <div className="placeholder"></div>

            <div className="buttons">
              <button onClick={start}>Start</button>
              <button onClick={next}>Next</button>
              <button onClick={pause}>Pause</button>
              <button onClick={skipToStart}>Skip To Start</button>
              <button>Skip To End</button>
            </div>

            <div className="Matrix-link">
              <a href="/matrix" target="_blank" rel="noopener noreferrer">
                => Hyper Sudoku Matrix
              </a>
            </div>

            <div className="placeholder"></div>
          </div>

          <div className="column right">
            <div className="logs-text">
              Running Logs:
            </div>

            <div className="logs">
              <ul>
                {logs.map((log) => <li>{log}</li>)}
              </ul>
            </div>
          </div>
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

export default SudokuView;