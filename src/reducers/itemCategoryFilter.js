const itemCategoryFilter = (state = 'NONE', action) => {
  switch (action.type) {
    case 'SET_ITEM_CATEGORY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default itemCategoryFilter;
