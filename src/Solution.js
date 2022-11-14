import React from 'react';
import SudokuView from './SudokuView';
import Matrix from './Matrix';

const Solution = () => {
  return (
      <div className="layout">
        <SudokuView />
        <Matrix />
      </div>
  );
};

export default Solution;