import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { toggleItem } from '../actions/item';
import * as CONSTANTS from '../define';

class ItemList extends Component {
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.WARDROBE ? '' : 'none' }}>
        <h3>Wardrobe</h3>
        <ul>
          {this.props.items.map(singleItem => (
            <li key={singleItem.id}>
              <input
                type="checkbox"
                value={singleItem.id}
                checked={!singleItem.own}
                onChange={e => this.props.onItemClick(parseInt(e.target.value, 10))}
              />{singleItem.id} {singleItem.name}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

ItemList.defaultProps = {
  items: [],
};

ItemList.propTypes = {
  viewMode: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(Object),
};

const getVisibleItems = (items, itemCategoryFilter) =>
  items.filter(item =>
    (item.category === itemCategoryFilter));

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  itemCategory: state.itemCategory,
  items: getVisibleItems(state.items, state.itemCategoryFilter),
});

const mapDispatchToProps = dispatch => ({
  onItemClick: itemId => dispatch(toggleItem(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
