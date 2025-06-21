import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppNew, {log0607 as TEST, log0608} from './components/App';
import reportWebVitals from './reportWebVitals';
TEST();
log0608();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <App />
  <React.StrictMode>
    <AppNew />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
