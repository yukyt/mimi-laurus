import * as CONSTANTS from '../define';

export const bestCoordinates = (state = {}, action) => {
  const emptyItem = {
    id: 0,
    name: '　ありません(\'ω\'乂)',
    score: 0,
    possession: true,
  };
  // Initialize
  let formattedBestCoordinates = {};
  Object.values(CONSTANTS.ITEM_CATEGORY).map((id) => {
    formattedBestCoordinates[id] = [emptyItem];
    return true;
  });

  switch (action.type) {
    case 'TOGGLE_ITEM': {
      formattedBestCoordinates = JSON.parse(JSON.stringify(state));
      Object.keys(formattedBestCoordinates).map((category) => {
        formattedBestCoordinates[category].filter((item) => {
          if (item.id !== action.itemId) {
            return item;
          }
          const newItem = item;
          newItem.possession = !newItem.possession;
          return newItem;
        });
        return formattedBestCoordinates[category];
      });
      return formattedBestCoordinates;
    }
    case 'CALC': {
      const stageObject = Object.values(action.stages)
        .find(stage => (stage.id === action.stageSelected));

      const categoryBlackList = [];
      if (stageObject.blackList.length > 0 && !Number.isInteger(stageObject.blackList[0])) {
        stageObject.blackList[0].type.forEach((k) => {
          categoryBlackList.push(CONSTANTS.BLACKLIST_ITEM_CATEGORY.get(k));
        });
      }

      action.items.forEach((item) => {
        // WhiteList check
        if (!stageObject.whiteList.includes(item.id)) {
          // BlackList check
          if (stageObject.blackList.includes(item.id)
              || categoryBlackList.includes(item.category)) {
            return;
          }
        }

        let tagScore = 0;
        // stage tags loop
        stageObject.tags.forEach((tagObject, tagKey) => {
          if (item.tags.includes(tagKey)) {
            // if item has matched tag, add score (rank score * rate)
            tagScore += CONSTANTS.RANK_WEIGHT.get(tagObject.value) * tagObject.product;
          }
        });

        let totalScore = 0;
        // stage styles loop
        stageObject.styles.forEach((styleRate, styleId) => {
          let styleScore = 0;
          if (item.styles.has(styleId)) {
            // if item has matched style, add score (only rank score here)
            styleScore = CONSTANTS.RANK_WEIGHT.get(item.styles.get(styleId));
            // if item category is accessory, decrease score.
            if (item.category >= CONSTANTS.ACCESSORY_MINIMUM_ITEM_CATEGORY) {
              styleScore *= CONSTANTS.ITEM_CATEGORY_DUMPING;
            }
          }
          // style rate effects both tag score and style score.
          totalScore += (styleScore + tagScore) * styleRate;
        });
        // half round up
        totalScore = Math.round(totalScore * CONSTANTS.ITEM_CATEGORY_SCALE.get(item.category));

        // add coordinate if score is not zero.
        if (totalScore > 0) {
          formattedBestCoordinates[item.category].push({
            id: item.id,
            name: item.name,
            score: totalScore,
            possession: (action.impossessions.indexOf(item.id) === -1),
          });
        }
      });

      // Score sort
      Object.keys(formattedBestCoordinates).map(category => (
        formattedBestCoordinates[category].sort((a, b) => {
          if (a.score > b.score) return -1;
          if (a.score < b.score) return 1;
          return 0;
        })
      ));
      return formattedBestCoordinates;
    }
    default:
      return state;
  }
};

export const focusItems = (state = new Map(), action) => {
  switch (action.type) {
    case 'CHANGE_FOCUS': {
      const results = new Map(state);
      results.set(action.category, action.pos);
      return results;
    }
    case 'CALC':
    case 'RESET_FOCUS': {
      const results = new Map();
      CONSTANTS.ITEM_CATEGORY_NAME.forEach((value, key) => results.set(key, 0));
      return results;
    }
    default:
      return state;
  }
};
