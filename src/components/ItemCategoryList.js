import React from 'react';
import FilterLink from '../containers/FilterLink';
import * as CONSTANTS from '../define';

// TODO move to menu list.
const ItemCategoryList = () => (
  <p>
    {Object.values(CONSTANTS.ITEM_CATEGORY).map(key => (
      <FilterLink filter={key} key={key}>
        {CONSTANTS.ITEM_CATEGORY_NAME.get(key)}
      </FilterLink>
    ))}
  </p>
);

export default ItemCategoryList;
