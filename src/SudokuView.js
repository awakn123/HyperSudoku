import React, {useContext} from 'react';
import './SudokuView.css'
import {SudokuContext} from './SudokuProvider';
import Matrix from './Matrix';
import logo from './logo.png';
import GithubLogo from './GithubLogo.png';

const SudokuView = () => {
  const sudokuData = useContext(SudokuContext);
  const {data, logs, next} = sudokuData;
  const sudokuTable = () => {
    const table = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(<td key={`td_${i}${j}`}>{data[i][j]}</td>);
      }
      table.push(<tr key={`tr_${i}`}>{row}</tr>);
    }
    return table;
  }

  return (
      <div className={"sudoku-view"}>
        <div className="header">
            <div className="logo">
              <img src={logo} alt="NEU logo" height="60px" width="60px"/>
            </div>

          <div className="title">
            <p>Hyper Sudoku Solver</p>
          </div>

          <div className="gitlogo">
            <a href="https://github.com/awakn123/HyperSudoku" target="_blank">
              <img src={GithubLogo} alt="Git logo" height="30px" width="30px"/>
            </a>
          </div>

          <div className="link">
            <a href="https://github.com/awakn123/HyperSudoku" target="_blank">
              <p>Github</p>
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

            <div className="logs">
              {logs}
            </div>
          </div>

          <div className="column right">
            <div className="matrix">
              <Matrix/>
            </div>
          </div>
        </div>
      
        <div className="footer">
          <div className="buttons">
            <button>Start</button>
            <button>Next</button>
          </div>
          
          <div className="author">
            <p>Author (Alphabetical Order): Liyang Song, Na Yin, Xueyan Feng, Yun Cao</p>
          </div>
        </div> 
      </div>      
  );
};

export default SudokuView;