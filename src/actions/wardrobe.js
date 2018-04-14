export const setItemCategoryFilter = filter => ({
  type: 'SET_ITEM_CATEGORY_FILTER',
  filter,
});

export const toggleItem = itemId => ({
  type: 'TOGGLE_ITEM',
  itemId,
});

export const scrollEnd = () => ({
  type: 'SCROLL_END',
});
