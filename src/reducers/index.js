import { combineReducers } from 'redux';
import { itemCategory, items, impossessions } from './item';
import { sectionFilter, stages } from './stage';
import { bestCoordinates, focusItems } from './simulator';
import { viewMode } from './menu';
import { itemCategoryFilter, itemShowMaxCount } from './wardrobe';

export default combineReducers({
  itemCategory,
  items,
  impossessions,

  sectionFilter,
  stages,

  bestCoordinates,
  focusItems,

  viewMode,

  itemCategoryFilter,
  itemShowMaxCount,
});
