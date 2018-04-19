import * as CONSTANTS from '../define';

export const bestCoordinates = (state = {}, action) => {
  const emptyItem = {
    id: 0,
    name: 'nothing',
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
      let stageObject;
      for (const stage of action.stages) {
        if (stage.id === action.stageSelected) {
          stageObject = stage;
        }
      }

      for (const item of action.items) {
        let tagScore = 0;
        // stage tags loop
        for (const [tagKey, tagObject] of stageObject.tags) {
          if (item.tags.includes(tagKey)) {
            // if item has matched tag, add score (rank score * rate)
            tagScore += CONSTANTS.RANK_WEIGHT.get(tagObject.value) * tagObject.product;
          }
        }

        let totalScore = 0;
        // stage styles loop
        for (const [styleId, styleRate] of stageObject.styles) {
          let styleScore = 0;
          if (item.styles.has(styleId)) {
            // if item has matched style, add score (only rank score here)
            styleScore = CONSTANTS.RANK_WEIGHT.get(item.styles.get(styleId));
          }
          // style rate effects both tag score and style score.
          totalScore += (styleScore + tagScore) * styleRate;
        }
        // half round up
        totalScore = Math.round(totalScore);

        // add coordinate if score is not zero.
        if (totalScore > 0) {
          formattedBestCoordinates[item.category].push({
            id: item.id,
            name: item.name,
            score: totalScore,
            possession: item.possession,
          });
        }
      }

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

export const focusItems = (state = [], action) => {
  const results = state.slice();
  switch (action.type) {
    case 'CHANGE_ITEM_POS': {
      results[action.category] = action.pos;
      return results;
    }
    default:
      return Array(50).fill(0);
  }
};
