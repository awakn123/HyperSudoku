import React from 'react';
import SudokuView from './SudokuView';
import NeuLayout from './NeuLayout';

const Solution = () => {
  return (
        <NeuLayout>
          <SudokuView />
        </NeuLayout>
  );
};

export default Solution;