import React, {useContext} from 'react';
import './SudokuView.css'
import {SudokuContext} from './SudokuProvider';
import Matrix from './Matrix';
import logo from './logo.png';

const SudokuView = () => {
  const sudokuData = useContext(SudokuContext);
  const {data, next} = sudokuData;
  return (
      <div className={"sudoku-view"}>
        <div class="header">
            <div class="logo">
              <img src={logo} alt="NEU logo" height="60px" width="60px"/>
            </div>

          <div class="title">
            <h3>Hyper Sudoku Solver</h3>
          </div>

          <div class="link">
            git link
          </div> 
        </div>
        
        <div class="content">
          <div class="column left">
            <div class="sudoku">
              <table>
                <tbody>
                  <tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr><tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr><tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr><tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr><tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr><tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr><tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          
            <div class="logs">
              logs
            </div>
          </div>

          <div class="column right">
            <div class="matrix">
              <Matrix />
            </div>
          </div>
        </div>
      
        <div class="footer">
          <div class="buttons">
            <button>New Sudoku</button>
            <button>Start</button>
            <button>Stop</button>
          </div>
          
          <div class="copyright">
            copyright
          </div>
        </div> 
      </div>      
  );
};

export default SudokuView;