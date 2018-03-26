import React from 'react';
import { PropTypes } from 'prop-types';

const ItemCategoryList = ({ children, onClick }) => (
  <a href="/">{children}</a>
);

ItemCategoryList.propTypes = {
  children: PropTypes.node.isRequired,
};

ItemCategoryList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ItemCategoryList;
