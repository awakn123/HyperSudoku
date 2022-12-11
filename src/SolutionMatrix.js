import React from 'react';
import Matrix from './Matrix';
import SudokuProvider from './SudokuProvider';
import NeuLayout from './NeuLayout';

const SolutionMatrix = () => {
  return (
      <SudokuProvider>
        <NeuLayout>
          <Matrix />
        </NeuLayout>
      </SudokuProvider>
  );
};

export default SolutionMatrix;