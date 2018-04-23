export const calc = (stages, items, stageSelected) => ({
  type: 'CALC',
  items,
  stages,
  stageSelected,
});

export const swipeItem = (category, pos) => ({
  type: 'CHANGE_FOCUS',
  category,
  pos,
});

export const resetFocus = () => ({
  type: 'RESET_FOCUS',
});
