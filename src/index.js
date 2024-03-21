import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Добавляем BrowserRouter
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './axios.config'


import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
