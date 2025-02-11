import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainContext from './Context/MainContext'
import App from './App';
import store from './store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
  <MainContext>
    <App/>
  </MainContext>
  </Provider>
 
);
 