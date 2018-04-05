export const calc = (stages, items, stageSelected) => ({
  type: 'CALC',
  items,
  stages,
  stageSelected,
});

export const swipeItem = (pos, category) => ({
  type: 'CHANGE_ITEM_POS',
  pos,
  category,
});

export default calc;
