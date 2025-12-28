import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Robust mounting logic (Iteration 3 requirement)
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Ensure index.html contains <div id="root"></div>');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);