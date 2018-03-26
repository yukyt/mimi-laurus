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
  switch (itemCategoryFilter) {
    case 'SHOW_HAIRSTYLE':
      return items.filter(item => (item.category === 1));
    case 'SHOW_DRESS':
      return items.filter(item => (item.category === 2));
    case 'SHOW_COAT':
      return items.filter(item => (item.category === 3));
    case 'SHOW_TOPS':
      return items.filter(item => (item.category === 4));
    case 'SHOW_BOTTOMS':
      return items.filter(item => (item.category === 5));
    case 'SHOW_SOCKS1':
      return items.filter(item => (item.category === 7));
    case 'SHOW_SOCKS2':
      return items.filter(item => (item.category === 8));
    case 'SHOW_SHOES':
      return items.filter(item => (item.category === 9));
    case 'SHOW_MAKE':
      return items.filter(item => (item.category === 10));
    case 'SHOW_HEAD1':
      return items.filter(item => (item.category === 13));
    case 'SHOW_HEAD2':
      return items.filter(item => (item.category === 14));
    case 'SHOW_HEAD3':
      return items.filter(item => (item.category === 15));
    case 'SHOW_HEAD4':
      return items.filter(item => (item.category === 16));
    case 'SHOW_EAR':
      return items.filter(item => (item.category === 17));
    case 'SHOW_NECK1':
      return items.filter(item => (item.category === 19));
    case 'SHOW_NECK2':
      return items.filter(item => (item.category === 20));
    case 'SHOW_ARM1':
      return items.filter(item => (item.category === 22));
    case 'SHOW_ARM2':
      return items.filter(item => (item.category === 23));
    case 'SHOW_ARM3':
      return items.filter(item => (item.category === 24));
    case 'SHOW_HAND1':
      return items.filter(item => (item.category === 26));
    case 'SHOW_HAND2':
      return items.filter(item => (item.category === 27));
    case 'SHOW_HAND3':
      return items.filter(item => (item.category === 28));
    case 'SHOW_BACK':
      return items.filter(item => (item.category === 29));
    case 'SHOW_SPECIAL1':
      return items.filter(item => (item.category === 31));
    case 'SHOW_SPECIAL2':
      return items.filter(item => (item.category === 32));
    case 'SHOW_SPECIAL3':
      return items.filter(item => (item.category === 33));
    case 'SHOW_SPECIAL4':
      return items.filter(item => (item.category === 34));
    case 'SHOW_SPECIAL5':
      return items.filter(item => (item.category === 35));
    case 'SHOW_SPECIAL6':
      return items.filter(item => (item.category === 36));
    case 'SHOW_SPECIAL7':
      return items.filter(item => (item.category === 37));
    case 'SHOW_SPECIAL8':
      return items.filter(item => (item.category === 38));
    case 'SHOW_SPECIAL9':
      return items.filter(item => (item.category === 39));
    case 'SHOW_SPECIAL10':
      return items.filter(item => (item.category === 40));
    default:
      return [];
  }
};

const mapStateToProps = state => ({
  itemCategory: state.itemCategory,
  items: getVisibleItems(state.items, state.itemCategoryFilter),
});

const mapDispatchToProps = dispatch => ({
  onItemClick: itemId => dispatch(toggleItem(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
