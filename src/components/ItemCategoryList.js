import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import FilterLink from '../containers/FilterLink';
import * as CONSTANTS from '../define';

class ItemCategoryList extends Component {
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.WARDROBE ? '' : 'none' }}>
        {Object.values(CONSTANTS.ITEM_CATEGORY).map(key => (
          <FilterLink filter={key} key={key}>
            {CONSTANTS.ITEM_CATEGORY_NAME.get(key)}
          </FilterLink>
      ))}
      </section>
    );
  }
}

ItemCategoryList.propTypes = {
  viewMode: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

const mapDispatchToProps = () => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemCategoryList);

