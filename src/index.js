import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/configureStore';
import ItemList from './components/ItemList';
import StageList from './components/StageList';
import ItemCategoryList from './components/ItemCategoryList';
import Simulator from './components/Simulator';
import NaviBar from './components/NaviBar';
import { initItems, initImpossessions } from './actions/item';
import { initStages } from './actions/stage';

injectTapEventPlugin();

const store = configureStore();

// Load data
store.dispatch(initImpossessions());
store.dispatch(initItems('https://miramiku.github.io/Laurus/resources/wardrobe.json', store.getState().impossessions));
store.dispatch(initStages('https://miramiku.github.io/Laurus/resources/stages.unpack.json'));

// Render
ReactDOM.render(
  <Provider store={store}>
    <NaviBar />
  </Provider>,
  document.getElementById('naviBar'),
);

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
    <ItemCategoryList />
  </Provider>,
  document.getElementById('itemCategoryList'),
);

ReactDOM.render(
  <Provider store={store}>
    <ItemList />
  </Provider>,
  document.getElementById('itemList'),
);
