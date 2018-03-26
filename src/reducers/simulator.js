export const bestCoordinates = (state = new Map(), action) => {
  const formattedBestCoordinates = new Map();

  // Score map (for both item and stage)
  const scoreMap = new Map([
    [6, 3200.0], // SSS
    [5, 2612.7], // SS
    [4, 2089.35], // S
    [3, 1690.65], // A
    [2, 1309.8], // B
    [1, 817.5], // C
  ]);

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
            tagScore += scoreMap.get(tagObject.value) * tagObject.product;
          }
        }

        let totalScore = 0;
        // stage styles loop
        for (const [styleName, styleRate] of stageObject.styles) {
          let styleScore = 0;
          if (item.styles.has(styleName)) {
            // if item has matched style, add score (only rank score here)
            styleScore = scoreMap.get(item.styles.get(styleName));
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
