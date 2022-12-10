import React from 'react';
import Matrix from './Matrix';
import SudokuProvider from './SudokuProvider';

const SolutionMatrix = () => {
  return (
      <SudokuProvider>
        <div className="layout">
          <Matrix />
        </div>
      </SudokuProvider>
  );
};

export default SolutionMatrix;