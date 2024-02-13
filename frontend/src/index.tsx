import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { AlertProvider } from './providers/AlertContext';
import Alert from './components/Alert/Alert';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AlertProvider>
        <Alert />
        <App />
      </AlertProvider>
    </Router>
  </React.StrictMode>
);
