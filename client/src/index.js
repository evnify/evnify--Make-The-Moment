import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { GoogleOAuthProvider } from "@react-oauth/google"


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='550101808419-h6glh8sc3bpfnkaq38963jjruntadf51.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </GoogleOAuthProvider>

);
reportWebVitals();
