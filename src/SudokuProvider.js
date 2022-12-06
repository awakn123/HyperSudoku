import React, {useState} from 'react';
import {initialSudoku, Matrix} from './SudokuAlgorithm'

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
    const num = matrix.chooseNumber();
    console.log(data, num);
    let sudoku = [...data.map(arr => [...arr])];
    sudoku[num.row][num.column] = num.value;
    setData(sudoku);
    setMatrix(Matrix.copyMatrix(matrix));
    console.log(sudoku);
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