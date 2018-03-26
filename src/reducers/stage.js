export const stages = (state = [], action) => {
  const formattedStages = [];

  switch (action.type) {
    case 'FETCH_STAGES_SUCCESS': {
      for (const section in action.stages) {
        for (const chapter in action.stages[section]) {
          for (const stageArray of action.stages[section][chapter]) {
            const styles = new Map();
            for (const [i, weight] of stageArray[3].entries()) {
              styles.set((i * 2) + (weight < 0 ? 1 : 0), Math.abs(weight));
            }
            const tags = new Map();
            for (const tag of stageArray[4]) {
              tags.set(tag[0], {
                value: tag[1],
                product: tag[2],
              });
            }
            formattedStages.push({
              id: stageArray[0],
              section,
              chapter,
              name: stageArray[0] + stageArray[1],
              styles,
              tags,
            });
          }
        }
      }
      return formattedStages;
    }
    default:
      return state;
  }
};

export const sectionFilter = (state = 'NONE', action) => {
  switch (action.type) {
    case 'SET_SECTION_FILTER':
      return action.filter;
    default:
      return state;
  }
};
