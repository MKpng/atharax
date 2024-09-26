import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // App handles routing
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* App contains the BrowserRouter and Routes */}
  </React.StrictMode>
);

reportWebVitals();
