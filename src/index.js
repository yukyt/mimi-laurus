import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ItemList from './components/ItemList';
import StageList from './components/StageList';
import Wardrobe from './containers/Wardrobe';
import Simulator from './containers/Simulator';
import Save from './containers/Save';
import Load from './containers/Load';
import Emoticon from './containers/Emoticon';
import Help from './containers/Help';
import Comment from './containers/Comment';
import NaviBar from './containers/NaviBar';
import { initItems, initImpossessions } from './actions/item';
import { initStages, chooseStage } from './actions/stage';
import { resetFocus, calc, setHighScorePossessionFocus } from './actions/simulator';
import * as CONSTANTS from './define';

const store = configureStore();

const init = async () => {
  store.dispatch(initImpossessions());
  store.dispatch(resetFocus());
  const awaitItems = store.dispatch(initItems('https://miramiku.github.io/Laurus/resources/wardrobe.json'));
  const awaitStages = store.dispatch(initStages('https://miramiku.github.io/Laurus/resources/stages.unpack.json'));
  await awaitItems;
  await awaitStages;
  store.dispatch(chooseStage(CONSTANTS.INIT_STAGE_ID));
  store.dispatch(calc(
    store.getState().stages,
    store.getState().items,
    CONSTANTS.INIT_STAGE_ID,
    store.getState().impossessions,
  ));
  store.dispatch(setHighScorePossessionFocus(store.getState().bestCoordinates));
};

init();

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
    <Wardrobe />
  </Provider>,
  document.getElementById('itemCategoryList'),
);

ReactDOM.render(
  <Provider store={store}>
    <ItemList />
  </Provider>,
  document.getElementById('itemList'),
);

ReactDOM.render(
  <Provider store={store}>
    <Save />
  </Provider>,
  document.getElementById('save'),
);

ReactDOM.render(
  <Provider store={store}>
    <Load />
  </Provider>,
  document.getElementById('load'),
);

ReactDOM.render(
  <Provider store={store}>
    <Emoticon />
  </Provider>,
  document.getElementById('emoticon'),
);

ReactDOM.render(
  <Provider store={store}>
    <Help />
  </Provider>,
  document.getElementById('help'),
);

ReactDOM.render(
  <Provider store={store}>
    <Comment />
  </Provider>,
  document.getElementById('comment'),
);
