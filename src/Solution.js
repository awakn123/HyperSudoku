import React from 'react';
import SudokuView from './SudokuView';
import SudokuProvider from './SudokuProvider';
import NeuLayout from './NeuLayout';

const Solution = () => {
  return (
      <SudokuProvider>
        <NeuLayout>
          <SudokuView />
        </NeuLayout>
      </SudokuProvider>
  );
};

export default Solution;