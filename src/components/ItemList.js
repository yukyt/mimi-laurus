import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { toggleItem } from '../actions/item';

class ItemList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map(singleItem => (
          <li key={singleItem.id}>
            <input type="checkbox" value={singleItem.id} checked={!singleItem.own} onChange={e => this.props.onItemClick(parseInt(e.target.value, 10))} />{singleItem.id} {singleItem.name}
          </li>
        ))}
      </ul>
    );
  }
}

ItemList.defaultProps = {
  items: [],
};

ItemList.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(Object),
};

const getVisibleItems = (items, itemCategoryFilter) => {
  return items.filter(item => (item.category === itemCategoryFilter));
};

const mapStateToProps = state => ({
  itemCategory: state.itemCategory,
  items: getVisibleItems(state.items, state.itemCategoryFilter),
});

const mapDispatchToProps = dispatch => ({
  onItemClick: itemId => dispatch(toggleItem(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
