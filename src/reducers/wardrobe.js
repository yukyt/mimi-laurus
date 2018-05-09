import * as CONSTANTS from '../define';

export const itemCategoryFilter = (state = CONSTANTS.ITEM_CATEGORY.HAIR, action) => {
  switch (action.type) {
    case 'SET_ITEM_CATEGORY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export const itemShowMaxCount = (state = CONSTANTS.ITEM_SHOW_COUNT.DEFAULT, action) => {
  switch (action.type) {
    case 'SET_ITEM_CATEGORY_FILTER':
      // reset when item category is change.
      return CONSTANTS.ITEM_SHOW_COUNT.DEFAULT;
    case 'SCROLL_END':
      return state + CONSTANTS.ITEM_SHOW_COUNT.INCREASE;
    default:
      return state;
  }
};

export const searchText = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
};
