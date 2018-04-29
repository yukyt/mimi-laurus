import React from 'react';
import { PropTypes } from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import RecommendItemList from './RecommendItemList';
import * as CONSTANTS from '../define';

const noRowsRenderer = () => <div>noRow</div>;

const renderRow = ({
  key, // Unique key within array of rows
  index, // Index of row within collection
}, {
  category,
  bestCoordinates,
  order,
  next,
  prev,
  onItemClick,
}) => {
  console.log('renderRow');
  return (
    <RecommendItemList
      key={key}
      category={category}
      categoryName={CONSTANTS.ITEM_CATEGORY_NAME.get(category)}
      order={order}
      next={next}
      prev={prev}
      bestCoordinates={bestCoordinates}
      onItemClick={() => onItemClick}
    />
  );
};

const Advisor = ({
  bestCoordinates, focusItems, viewMode, next, prev, onItemClick,
}) => (
  <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
    <AutoSizer>
      {({ width }) => (
        <List
          width={width}
          height={400}
          rowCount={Object.keys(bestCoordinates).length}
          rowHeight={64}
          noRowsRenderer={noRowsRenderer}
          overscanRowCount={2}
          rowRenderer={param => renderRow(
            param,
            {
              category: parseInt(Object.keys(bestCoordinates)[param.index], 10),
              bestCoordinates: bestCoordinates[Object.keys(bestCoordinates)[param.index]].slice(0, 3),
              order: focusItems.get(parseInt(Object.keys(bestCoordinates)[param.index], 10)),
              next,
              prev,
              onItemClick,
            },
          )}
        />
      )}
    </AutoSizer>
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
