import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { MenuContextProvider } from './store/MenuContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MenuContextProvider>
      <App />
    </MenuContextProvider>
  </BrowserRouter>
);
