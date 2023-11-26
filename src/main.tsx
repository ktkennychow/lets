import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Root from './routes/root';
import ProgressPage from './routes/ProgressPage';
import SessionPage from './routes/sessionPage';
import HistoryPage from './routes/historyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/progress', element: <ProgressPage /> },
      { path: '/session', element: <SessionPage /> },
      { path: '/history', element: <HistoryPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
