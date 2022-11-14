import React, {useContext} from 'react';
import './SudokuView.css'
import {SudokuContext} from './SudokuProvider';

const SudokuView = () => {
  const sudokuData = useContext(SudokuContext);
  const {data, next} = sudokuData;
  return (
      <div className={"sudoku-view"}>
        SudokuView
        {data[0][0]}
        <button onClick={() => next()}>Next</button>
      </div>
  );
};

export default SudokuView;