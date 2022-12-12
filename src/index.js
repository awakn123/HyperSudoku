import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Entrance from './Entrance';
import Solution from './Solution';
import {createHashRouter, redirect, RouterProvider} from 'react-router-dom';
import SolutionMatrix from './SolutionMatrix';
import SudokuProvider from './SudokuProvider';

const router = createHashRouter([
  {
    path: '/', element: <Entrance/>,
  }, {
    path: 'solution', element: <Solution/>,
  }, {
    path: 'matrix', element: <SolutionMatrix/>,
  }, {
    path: '*', loader: () => redirect('/'),
  }]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
  <SudokuProvider>
    <RouterProvider router={router}/>
  </SudokuProvider>
</React.StrictMode>);
