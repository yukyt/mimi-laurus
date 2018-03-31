import { combineReducers } from 'redux';
import { itemCategory, items, impossessions } from './item';
import { sectionFilter, stages } from './stage';
import { bestCoordinates } from './simulator';
import { viewMode } from './menu';
import itemCategoryFilter from './itemCategoryFilter';

export default combineReducers({
  itemCategory,
  items,
  impossessions,

  sectionFilter,
  stages,

  bestCoordinates,

  viewMode,

  itemCategoryFilter,
});
