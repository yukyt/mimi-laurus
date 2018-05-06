export const initItems = (url, impossessions) => async (dispatch) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    dispatch({ type: 'FETCH_ITEMS_SUCCESS', items: responseJson, impossessions });
    return true;
  } catch (error) {
    dispatch({ type: 'FETCH_ITEMS_FAILD', error });
    return false;
  }
};

export const initImpossessions = () => (dispatch) => {
  const impossessions = JSON.parse(localStorage.getItem('impossessions')) || [];
  dispatch({ type: 'FETCH_IMPOSSESSIONS_SUCCESS', impossessions: impossessions.map(v => parseInt(v, 10)) });
  return true;
};

export const loadImpossessionFile = impossessions => (dispatch) => {
  localStorage.setItem('impossessions', JSON.stringify(impossessions));
  dispatch({ type: 'LOAD_IMPOSSESSIONS_SUCCESS', impossessions: impossessions.map(v => parseInt(v, 10)) });
  return true;
};
