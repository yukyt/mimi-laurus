import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ItemList from './components/ItemList';
import StageList from './components/StageList';
import Menu from './components/Menu';
import Simulator from './components/Simulator';
import { initItems, initImpossessions } from './actions/item';
import { initStages } from './actions/stage';

const store = configureStore();

// Load data
store.dispatch(initImpossessions());
store.dispatch(initItems('https://miramiku.github.io/Laurus/resources/wardrobe.json', store.getState().impossessions));
store.dispatch(initStages('https://miramiku.github.io/Laurus/resources/stages.unpack.json'));

// Render
ReactDOM.render(
  <Provider store={store}>
    <StageList />
  </Provider>,
  document.getElementById('stageList'),
);

ReactDOM.render(
  <Provider store={store}>
    <Simulator />
  </Provider>,
  document.getElementById('simulator'),
);

ReactDOM.render(
  <Provider store={store}>
    <Menu />
  </Provider>,
  document.getElementById('menu'),
);

ReactDOM.render(
  <Provider store={store}>
    <ItemList />
  </Provider>,
  document.getElementById('itemList'),
);