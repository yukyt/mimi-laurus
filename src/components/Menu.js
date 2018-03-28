import React from 'react';
import FilterLink from '../containers/FilterLink';
import * as CONSTANTS from '../define';

const Menu = () => (
  <p>
    Wardrobe:
    {Object.values(CONSTANTS.ITEM_CATEGORY).map((key) => (
      <FilterLink filter={key}>
        {CONSTANTS.ITEM_CATEGORY_NAME.get(key)}
      </FilterLink>
    ))}
  </p>
);

export default Menu;
