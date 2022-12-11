import React, {useState, useEffect, useRef} from 'react';
import {Matrix} from './SudokuAlgorithm'

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

const SudokuProvider = ({ children }) => {
  const [logs, setLogs] = useState([])
  const addLogs = (...newLogs) => {
    setLogs((prevLogs) => [...prevLogs, ...newLogs]);
  }
  const [sudokuIndex, setSudokuIndex] = useState(0)
  const [data, setData] = useState([])
  const [matrix, setMatrix] = useState(null)
  const [node, setNode] = useState(null);
  const [fail, setFail] = useState(false);
  const [delay, setDelay] = useState(null);
  const [sudokuArray, setSudokuArray] = useState([]);

  useEffect(()=>{
    fetch("/Sudoku.json").then((res) => res.json()).then((res) => {
      setSudokuArray(res);
    })
  }, [])

  useEffect(() => {
    skipToStart()
  }, [sudokuArray.length])

  const next = () => {
    if (fail) {
      addLogs("Fail to find the solution.");
      setDelay(null);
      return true;
    }
    if (matrix.checkSuccess()) {
      addLogs("The sudoku is completed successfully.");
      setDelay(null);
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
    setData(sudokuArray[sudokuIndex]);
    const matrix = new Matrix(sudokuArray[sudokuIndex]);
    matrix.addLogs = addLogs;
    setMatrix(matrix)
    setNode(matrix.root)
    setFail(false);
    setDelay(null);
    setLogs([])
  }

  useInterval(() => {
    next();
  }, delay);

  const skipToEnd = () => {
    setDelay(0)
  }

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
            skipToEnd,
          }}
      >
        {children}
      </SudokuContext.Provider>
  )
}
export default SudokuProvider;