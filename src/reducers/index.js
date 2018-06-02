import { combineReducers } from 'redux';
import 'babel-polyfill';
import { items, impossessions } from './item';
import { sectionFilter, stages, selectedStage } from './stage';
import { bestCoordinates, focusItems } from './simulator';
import { viewMode } from './menu';
import { itemCategoryFilter, itemShowMaxCount, searchText } from './wardrobe';

export default combineReducers({
  items,
  impossessions,

  sectionFilter,
  stages,
  selectedStage,

  bestCoordinates,
  focusItems,

  viewMode,

  itemCategoryFilter,
  itemShowMaxCount,
  searchText,
});
