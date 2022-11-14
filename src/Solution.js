import React from 'react';
import SudokuView from './SudokuView';
import Matrix from './Matrix';
import SudokuProvider from './SudokuProvider';

const Solution = () => {
  return (
      <SudokuProvider>
        <div className="layout">
          <SudokuView />
          <Matrix />
        </div>
      </SudokuProvider>
  );
};

export default Solution;