import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Entrance from './Entrance';
import Solution from './Solution';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SolutionMatrix from './SolutionMatrix';

const router = createBrowserRouter([
  {
    path: '/', element: <Entrance/>,
  }, {
    path: 'solution', element: <Solution />,
  }, {
    path: 'matrix', element: <SolutionMatrix />,
  }]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
  <RouterProvider router={router}/>
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
