import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <- Moved here */}
      <CookiesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
