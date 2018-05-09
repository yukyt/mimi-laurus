import * as CONSTANTS from '../define';

export const stages = (state = [], action) => {
  const formattedStages = [];

  switch (action.type) {
    case 'FETCH_STAGES_SUCCESS': {
      for (const section in action.stages) {
        for (const chapter in action.stages[section]) {
          for (const stageArray of action.stages[section][chapter]) {
            const styles = new Map();
            for (const [i, weight] of stageArray[CONSTANTS.STAGE_JSON_COLUMN.STYLE].entries()) {
              styles.set((i * 2) + (weight < 0 ? 1 : 0), Math.abs(weight));
            }
            const tags = new Map();
            for (const tag of stageArray[CONSTANTS.STAGE_JSON_COLUMN.TAG]) {
              tags.set(tag[0], {
                value: tag[1],
                product: tag[2],
              });
            }
            formattedStages.push({
              id: stageArray[CONSTANTS.STAGE_JSON_COLUMN.ID],
              section,
              chapter,
              name: stageArray[CONSTANTS.STAGE_JSON_COLUMN.NAME],
              styles,
              tags,
              blackList: stageArray[CONSTANTS.STAGE_JSON_COLUMN.BLACK_LIST],
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
