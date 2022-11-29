import React, {useState} from 'react';
import {initialSudoku, generateMatrix} from './SudokuAlgorithm'

export const SudokuContext = React.createContext({});

const SudokuProvider = ({ children }) => {
  const [data, setData] = useState(initialSudoku)
  const [matrix, setMatrix] = useState(generateMatrix())

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
            matrix,
          }}
      >
        {children}
      </SudokuContext.Provider>
  )
}
export default SudokuProvider;