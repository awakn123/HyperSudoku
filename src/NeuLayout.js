import React from 'react';
import logo from './logo.png';
import GithubLogo from './GithubLogo.png';

const NeuLayout = ({children}) => {
  return (
      <div className="layout">
        <div className="matrix-page">
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
                Github
              </a>
            </div>
          </div>
          {children}

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
      </div>
  );
};

export default NeuLayout;