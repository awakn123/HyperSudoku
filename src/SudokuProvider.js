import React, {useState} from 'react';

export const SudokuContext = React.createContext({});

const SudokuProvider = ({ children }) => {
  const [data, setData] = useState(new Array(9).fill(0).map((val, idx) => new Array(9).fill(0)))

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
          }}
      >
        {children}
      </SudokuContext.Provider>
  )
}
export default SudokuProvider;