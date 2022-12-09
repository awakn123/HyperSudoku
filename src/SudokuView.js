import React, {useContext} from 'react';
import './SudokuView.css'
import {SudokuContext} from './SudokuProvider';
import Matrix from './Matrix';
import logo from './logo.png';
import GithubLogo from './GithubLogo.png';

const SudokuView = () => {
  const sudokuData = useContext(SudokuContext);
  const {data, next} = sudokuData;
  const sudokuTable = () => {
    const row = [];
    const table = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        row.push(<td class="r{i+1}c{j+1}">{data[i][j]}</td>);
      }
      table.push(<tr>{row}</tr>);
    }
    return (<table class="table">{table}</table>);
  }

  return (
      <div className={"sudoku-view"}>
        <div class="header">
            <div class="logo">
              <img src={logo} alt="NEU logo" height="60px" width="60px"/>
            </div>

          <div class="title">
            <p>Hyper Sudoku Solver</p>
          </div>

          <div class="gitlogo">
            <a href="https://github.com/awakn123/HyperSudoku" target="_blank">
              <img src={GithubLogo} alt="Git logo" height="30px" width="30px"/>
            </a>
          </div>

          <div class="link">
            <a href="https://github.com/awakn123/HyperSudoku" target="_blank">
              <p>Github</p>
            </a>
          </div> 
        </div>
        
        <div class="content">
          <div class="column left">
            <div class="sudoku">
              {sudokuTable()}
            </div>

            <div class="logs">
              {next()}
            </div>
          </div>

          <div class="column right">
            <div class="matrix">
              {Matrix()}
            </div>
          </div>
        </div>
      
        <div class="footer">
          <div class="buttons">
            <button>Start</button>
            <button>Next</button>
          </div>
          
          <div class="author">
            <p>Author (Alphabetical Order): Liyang Song, Na Yin, Xueyan Feng, Yun Cao</p>
          </div>
        </div> 
      </div>      
  );
};

export default SudokuView;