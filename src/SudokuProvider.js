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
  const [fail, setFail] = useState(false);
  const [delay, setDelay] = useState(null);

  const next = () => {
    if (fail || matrix.checkSuccess()) {
      addLogs("The sudoku is completed successfully.");
      return true;
    }
    let {number} = node, value = 0, nextNode;
    if (node.checkFail()) {
      nextNode = node.revert();
      matrix.revert(node);
    } else {
      nextNode = matrix.chooseNumber(node);
      if (nextNode.number == null) {
        matrix.revert(node);
        return;
      }
      setNode(nextNode);
      number = nextNode.number;
      value = number.value;
    }
    if (number == null) {
      addLogs("The sudoku fails.");
      setFail(true)
      return;
    }
    let sudoku = [...data.map(arr => [...arr])];
    sudoku[number.row][number.column] = value;
    setData(sudoku);
    setMatrix(Matrix.copyMatrix(matrix));
    setNode(nextNode);
  }

  const start = () => {
    setDelay(1000);
  }
  const pause = () => {
    setDelay(null)
  }
  const skipToStart = () => {
    const matrix = new Matrix(initialSudoku);
    matrix.addLogs = addLogs;
    setData(initialSudoku);
    setMatrix(matrix)
    setNode(matrix.root)
    setFail(false);
    setDelay(null);
    setLogs([])
  }

  useInterval(() => {
    next();
  }, delay);

  return (
      <SudokuContext.Provider
          value={{
            data,
            matrix,
            logs,
            node,
            next,
            start,
            pause,
            skipToStart,
          }}
      >
        {children}
      </SudokuContext.Provider>
  )
}
export default SudokuProvider;