import * as CONSTANTS from '../define';

export const bestCoordinates = (state = new Map(), action) => {
  const formattedBestCoordinates = new Map();

  switch (action.type) {
    case 'CALC': {
      let stageObject;
      for (const stage of action.stages) {
        if (stage.id === action.stageSelected) {
          stageObject = stage;
        }
      }

      for (const item of action.items) {
        if (item.own === false) {
          continue;
        }

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

        // High score check
        if (!formattedBestCoordinates.has(item.category)
            || formattedBestCoordinates.get(item.category).score < totalScore) {
          formattedBestCoordinates.set(item.category, { name: item.name, score: totalScore });
        }
      }
      return formattedBestCoordinates;
    }
    default:
      return state;
  }
};

export default bestCoordinates;
