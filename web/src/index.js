import React from 'react';
import ReactDOM from 'react-dom';
import './venders/bootstrap.min.css'
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from './reducers/index'


const store = createStore(reducer)


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
