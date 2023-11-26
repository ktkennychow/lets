import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App.tsx';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/abc', element: <div>abc</div> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
