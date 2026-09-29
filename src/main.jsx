import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Ye check karega ki agar app GitHub Pages par hai toh basename use ho, 
// aur agar local computer (localhost) par hai toh seedha root '/' chale.
const basename = window.location.hostname.includes('github.io') ? '/Project-Nivara' : '';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);