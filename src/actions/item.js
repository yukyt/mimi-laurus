export const initItems = (url, impossessions) => async (dispatch) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    dispatch({ type: 'FETCH_ITEMS_SUCCESS', items: responseJson, impossessions: impossessions });
    return true;
  } catch (error) {
    dispatch({ type: 'FETCH_ITEMS_FAILD', error });
    return false;
  }
};

export const initImpossessions = () => (dispatch) => {
  let storageValue = JSON.parse(localStorage.getItem('impossessions')) || [];
  dispatch({ type: 'FETCH_IMPOSSESSIONS_SUCCESS', impossessions: storageValue.filter(v => parseInt(v, 10))});
  return true;
};

export const toggleItem = itemId => ({
  type: 'TOGGLE_ITEM',
  id: itemId,
});

export const setItemCategoryFilter = filter => ({
  type: 'SET_ITEM_CATEGORY_FILTER',
  filter,
});