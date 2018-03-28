import React from 'react';
import FilterLink from '../containers/FilterLink';
import * as CONSTANTS from '../define';

const ItemCategoryList = () => (
  <p>
    Wardrobe:
    {Object.values(CONSTANTS.ITEM_CATEGORY).map((key) => (
      <FilterLink filter={key} key={key}>
        {CONSTANTS.ITEM_CATEGORY_NAME.get(key)}
      </FilterLink>
    ))}
  </p>
);

export default ItemCategoryList;
