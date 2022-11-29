import React, {useState} from 'react';
import {initialSudoku, generateMatrix, initSudoku} from './SudokuAlgorithm'

export const SudokuContext = React.createContext({});

const SudokuProvider = ({ children }) => {
  const basicMatrix = generateMatrix();
  const {sudoku, matrix: initialMatrix, logs: initialLogs} = initSudoku(initialSudoku, basicMatrix);
  const [data, setData] = useState(sudoku)
  const [matrix, setMatrix] = useState(initialMatrix)
  const [logs, setLogs] = useState(initialLogs)
  const addLogs = (...newLogs) => {
    setLogs([...logs, ...newLogs]);
  }

  const next = () => {
    data[0][0]++;
    data[0][0]++;
    setData([...data]);
  }

  return (
      <SudokuContext.Provider
          value={{
            data,
            next,
            logs,
            matrix,
          }}
      >
        {children}
      </SudokuContext.Provider>
  )
}
export default SudokuProvider;