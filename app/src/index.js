import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';

const trackingId = 'UA-177950673-1';

ReactGA.initialize(trackingId);
ReactGA.event({
  category: 'User',
  action: window.location.search
});

console.log(`Current commit is ${process.env.REACT_APP_CURRENT_COMMIT}`);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
