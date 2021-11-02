import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/css/reset.less"
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Map } from 'react-amap';

// const AMAP_KEY = 'ddb1ccbc9c43c835a29a12fe87e44fe2';
ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <Map amapkey={AMAP_KEY} /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
