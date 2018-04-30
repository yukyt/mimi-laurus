import React from 'react';
import { PropTypes } from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import RecommendItemList from './RecommendItemList';
import * as CONSTANTS from '../define';

const nowRendering = isRendering => ((isRendering) ? (<CircularProgress className="loading" />) : '');

const Advisor = ({
  bestCoordinates, focusItems, viewMode, next, prev, onItemClick,
}) => (
  <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
    {nowRendering(Object.keys(bestCoordinates).length === 0)}
    {Object.keys(bestCoordinates).map(category =>
      (<RecommendItemList
        key={parseInt(category, 10)}
        category={parseInt(category, 10)}
        categoryName={CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10))}
        order={focusItems.get(parseInt(category, 10))}
        next={next}
        prev={prev}
        bestCoordinates={bestCoordinates[category].slice(0, 3)}
        onItemClick={() => onItemClick}
      />))
    }
  </section>
);

Advisor.propTypes = {
  bestCoordinates: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  focusItems: PropTypes.instanceOf(Map).isRequired,
  viewMode: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default Advisor;
