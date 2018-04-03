export const viewMode = (state = 1, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW_MODE':
      return action.menuItem;
    default:
      return state;
  }
};

export default viewMode;
