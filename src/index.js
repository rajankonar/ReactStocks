import React from "react";
import ReactDOM from "react-dom";
import StockList from './js/components/StockList.jsx';
import './scss/styles.scss';
import { Provider } from 'react-redux';
import store from './js/components/Store.jsx'

ReactDOM.render(
  <Provider store={store}>
  <StockList/>
  </Provider>,
  document.getElementById('app')
);
