import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './index.css';
import App from './App';
import ProgressPage from './routes/ProgressPage';
import HistoryPage from './routes/HistoryPage';
import SessionPage from './routes/SessionPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/progress' element={<ProgressPage />} />
      <Route path='/session' element={<SessionPage />} />
      <Route path='/history' element={<HistoryPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
