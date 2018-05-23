import * as CONSTANTS from '../define';

export const stages = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_STAGES_SUCCESS': {
      let sectionName = {};
      let chapterName = {};
      const ret = Object.keys(action.stages)
        .map((sectionKey) => {
          sectionName = sectionKey;
          return Object.keys(action.stages[sectionName]).map((chapterKey) => {
            chapterName = chapterKey;
            return action.stages[sectionName][chapterName].map((stageArray) => {
              const styles = new Map();
              stageArray[CONSTANTS.STAGE_JSON_COLUMN.STYLE].forEach((weight, i) => {
                styles.set((i * 2) + (weight < 0 ? 1 : 0), Math.abs(weight));
              });
              const tags = new Map();
              stageArray[CONSTANTS.STAGE_JSON_COLUMN.TAG].forEach((tagArray) => {
                tags.set(tagArray[0], {
                  value: tagArray[1],
                  product: tagArray[2],
                });
              });
              return {
                id: stageArray[CONSTANTS.STAGE_JSON_COLUMN.ID],
                section: sectionName,
                chapter: chapterName,
                name: `${stageArray[CONSTANTS.STAGE_JSON_COLUMN.ID]} ${stageArray[CONSTANTS.STAGE_JSON_COLUMN.NAME]}`,
                styles,
                tags,
                blackList: stageArray[CONSTANTS.STAGE_JSON_COLUMN.BLACK_LIST],
                whiteList: stageArray[CONSTANTS.STAGE_JSON_COLUMN.WHITE_LIST],
              };
            });
          });
        });
      // flatten
      return ret.concat.apply([], ret.concat.apply([], ret));
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
