import React, {useState, useEffect, useRef} from 'react';
import {initialSudoku, Matrix} from './SudokuAlgorithm'

export const SudokuContext = React.createContext({});

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
const initialMatrix = new Matrix(initialSudoku);

const SudokuProvider = ({ children }) => {
  const [logs, setLogs] = useState([])
  const addLogs = (...newLogs) => {
    setLogs((prevLogs) => [...prevLogs, ...newLogs]);
  }
  initialMatrix.addLogs = addLogs;
  const [data, setData] = useState(initialSudoku)
  const [matrix, setMatrix] = useState(initialMatrix)
  const [node, setNode] = useState(matrix.root);

  const next = () => {
    if (matrix.checkSuccess()) {
      return true;
    }
    let {number} = node, value = 0, nextNode;
    if (node.checkFail()) {
      nextNode = node.revert();
      matrix.revert(node);
    } else {
      nextNode = matrix.chooseNumber(node);
      setNode(nextNode);
      number = nextNode.number;
      value = number.value;
    }
    console.log(data, number);
    let sudoku = [...data.map(arr => [...arr])];
    sudoku[number.row][number.column] = value;
    setData(sudoku);
    setMatrix(Matrix.copyMatrix(matrix));
    setNode(nextNode);
    console.log(sudoku, logs);
  }

  // useInterval(() => {
  //   next();
  // }, 1000);

  return (
      <SudokuContext.Provider
          value={{
            data,
            next,
            matrix,
            logs,
          }}
      >
        {children}
      </SudokuContext.Provider>
  )
}
export default SudokuProvider;