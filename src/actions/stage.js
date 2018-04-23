export const initStages = url => async (dispatch) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    dispatch({ type: 'FETCH_STAGES_SUCCESS', stages: responseJson });
    return true;
  } catch (error) {
    dispatch({ type: 'FETCH_STAGES_FAILED', error });
    return false;
  }
};

export const chooseSection = filter => ({
  type: 'SET_SECTION_FILTER',
  filter,
});
