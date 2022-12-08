import React from 'react';
import SudokuView from './SudokuView';
import SudokuProvider from './SudokuProvider';

const Solution = () => {
  return (
      <SudokuProvider>
        <div className="layout">
          <SudokuView />
        </div>
      </SudokuProvider>
  );
};

export default Solution;