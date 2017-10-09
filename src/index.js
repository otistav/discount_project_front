import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers/index';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));



ReactDOM.render(<Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
