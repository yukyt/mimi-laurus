import React from 'react';
import { PropTypes } from 'prop-types';
import RecommendItemList from './RecommendItemList';
import * as CONSTANTS from '../define';

const Advisor = ({
  bestCoordinates, focusItems, viewMode, next, prev, onItemClick,
}) => (
  <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
    {Object.keys(bestCoordinates).map(category =>
      (<RecommendItemList
        key={CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10))}
        category={category}
        categoryName={CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10))}
        order={focusItems[category] + 1}
        next={next}
        prev={prev}
        focusItem={focusItems[category]}
        bestCoordinates={bestCoordinates[category].slice(0, 3)}
        onItemClick={() => onItemClick}
      />))
    }
  </section>
);

Advisor.propTypes = {
  bestCoordinates: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  focusItems: PropTypes.arrayOf(Object).isRequired,
  viewMode: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default Advisor;
