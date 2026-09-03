import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CityProvider } from './config/CityContext';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CityProvider>
        <App />
      </CityProvider>
    </BrowserRouter>
  </React.StrictMode>
);
