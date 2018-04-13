import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import { toggleItem } from '../actions/item';
import * as CONSTANTS from '../define';

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = value => () => {
      this.props.onItemClick(value);
    };
  }

  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.WARDROBE ? '' : 'none' }}>
        <List>
          {this.props.items.map(singleItem => (
            <ListItem
              key={singleItem.id}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(singleItem.id)}
            >
              <Checkbox
                checked={!singleItem.possession}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`${singleItem.name}`} />
            </ListItem>
          ))}
        </List>
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
  onItemClick: (itemId) => {
    console.log(itemId);
    dispatch(toggleItem(itemId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
