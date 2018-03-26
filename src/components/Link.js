import React from 'react';
import { PropTypes } from 'prop-types';

const Link = ({ children, onClick }) => (
  <button
    onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
  >
    {children}
  </button>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
