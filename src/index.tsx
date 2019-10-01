import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/src/css/mapbox-gl.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getCombinedReducer } from 'harmoware-vis';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import heatmapSettings from './reducer/heatmapSettings';
import createSagaMiddleware from 'redux-saga';

const saga = createSagaMiddleware();

const store = createStore(
  getCombinedReducer({
    heatmapSettings
  }),
  applyMiddleware(saga)
);

ReactDOM.render(
  <Provider store={store as any}>
  <App />
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
