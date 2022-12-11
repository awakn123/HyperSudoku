import React, {useState, useEffect, useRef} from 'react';
import Matrix from './sudokuAlgorithm/Matrix'

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
  const [delay, setDelay] = useState(null);
  const [sudokuArray, setSudokuArray] = useState([]);
  const [end, setEnd] = useState(false)

  useEffect(()=>{
    fetch("/Sudoku.json").then((res) => res.json()).then((res) => {
      setSudokuArray(res);
    })
  }, [])

  useEffect(() => {
    skipToStart()
  }, [sudokuArray.length, sudokuIndex])

  const next = () => {
    if (end) {
      setDelay(null);
      return true;
    }
    if (matrix.checkSuccess()) {
      addLogs("The sudoku is completed successfully.");
      setDelay(null);
      setEnd(true)
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
      setEnd(true)
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
    setEnd(false);
    setDelay(null);
    setLogs([])
  }

  useInterval(() => {
    next();
  }, delay);

  const skipToEnd = () => {
    setDelay(0);
  }

  useEffect(()=>{
    setData((data) => {
      return Array.isArray(data) ? [...data.map(arr => [...arr])] : data
    });
  }, [end])

  const switchToNext = () => {
    let nextIdx = sudokuIndex + 1;
    if (nextIdx >= sudokuArray.length) {
      nextIdx = 0;
    }
    setSudokuIndex(nextIdx);
  }

  return (
      <SudokuContext.Provider
          value={{
            data,
            initialSudoku: sudokuArray[sudokuIndex],
            matrix,
            logs,
            node,
            next,
            start,
            pause,
            skipToStart,
            skipToEnd,
            switchToNext,
          }}
      >
        {children}
      </SudokuContext.Provider>
  )
}
export default SudokuProvider;