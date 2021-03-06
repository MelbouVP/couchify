import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter as Router } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <LastLocationProvider>
          <App />
        </LastLocationProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
