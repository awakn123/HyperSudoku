import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Entrance from './Entrance';
import Solution from './Solution';
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
