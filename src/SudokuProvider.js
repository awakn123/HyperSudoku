import React, {useState} from 'react';
import {initialSudoku, generateMatrix, initSudoku, Matrix} from './SudokuAlgorithm'

export const SudokuContext = React.createContext({});

const SudokuProvider = ({ children }) => {
  const [logs, setLogs] = useState([])
  const addLogs = (...newLogs) => {
    setLogs([...logs, ...newLogs]);
  }
  const initialMatrix = new Matrix(initialSudoku, addLogs);
  const [data, setData] = useState(initialSudoku)
  const [matrix, setMatrix] = useState(initialMatrix)


  const next = () => {
    setData([...data]);
  }

  return (
      <SudokuContext.Provider
          value={{
            data,
            next,
            matrix,
          }}
      >
        {children}
      </SudokuContext.Provider>
  )
}
export default SudokuProvider;