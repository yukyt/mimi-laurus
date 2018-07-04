import React from 'react';
import { PropTypes } from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import RecommendItemList from './RecommendItemList';
import * as CONSTANTS from '../define';

const nowRendering = isRendering => ((isRendering) ? (<CircularProgress className="loading" />) : '');

const Advisor = ({
  slicedBestCoordinates, focusItems, viewMode, next, prev, onItemClick,
}) => (
  <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
    {nowRendering(Object.keys(slicedBestCoordinates).length === 0)}
    {Object.keys(slicedBestCoordinates).map(category =>
      (<RecommendItemList
        key={parseInt(category, 10)}
        category={parseInt(category, 10)}
        categoryName={CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10))}
        order={focusItems.get(parseInt(category, 10))}
        next={next}
        prev={prev}
        slicedCategoryBestCoordinates={slicedBestCoordinates[category]}
        onItemClick={() => onItemClick}
      />))
    }
  </section>
);

Advisor.propTypes = {
  slicedBestCoordinates: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  focusItems: PropTypes.instanceOf(Map).isRequired,
  viewMode: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default Advisor;
