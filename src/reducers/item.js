const itemToggle = (state, action) => {
  if (state.id !== action.id) {
    return state;
  }
  return Object.assign({}, state, {
    own: !state.own,
  });
};

export const itemCategory = (state = '', action) => {
  switch (action.type) {
    case 'INIT_ITEM_CATEGORY':
      return action.itemCategory;
    default:
      return state;
  }
};

export const items = (state = [], action) => {
  const formattedItems = [];
  switch (action.type) {
    case 'TOGGLE_ITEM':
      return state.map(t =>
        itemToggle(t, action));
    case 'FETCH_ITEMS_SUCCESS':
      for (const itemArray of action.items) {
        const styles = new Map();
        let i = 0;
        for (const styleHex of itemArray[4].split('')) {
          // convert from hex to decimal
          const styleDec = parseInt(styleHex, 16);
          // 8bit: style flag(upper or lower style)
          const styleType = (i * 2) + ((styleDec & 8) ? 1 : 0);
          // 1～7bit: style weight (0:none 1:C 2:B 3:A 4:S 5:SS 6:SSS 7~8:undefined)
          const styleClass = (styleDec & 7) + 1;
          styles.set(styleType, styleClass);
          i++;
        }

        formattedItems.push({
          id: itemArray[0],
          category: itemArray[1][0],
          name: itemArray[3],
          styles,
          tags: [
            (itemArray[5] % 45), // TODO: 45 is all tag count. 
            Math.floor(itemArray[5] / 45),
          ],
          own: !(action.impossessions.indexOf(itemArray[0]) >= 0),
        });
      }
      return formattedItems;
    default:
      return state;
  }
};

export const impossessions = (state = [], action) => {
  let results = state;
  switch (action.type) {
    case 'FETCH_IMPOSSESSIONS_SUCCESS':
      return action.impossessions;
    case 'TOGGLE_ITEM':
      if (results.indexOf(action.id) >= 0) {
        results = results.filter((v) => (v !== action.id));
      } else {
        results.push(action.id); 
      }
      localStorage.setItem('impossessions', JSON.stringify(results));
      return results;
    default:
      return state;
  }
};
