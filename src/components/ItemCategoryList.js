import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import * as CONSTANTS from '../define';

class ItemCategoryList extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      selectedKey: 1,
    };
  }
  handleClickListItem(e) {
    this.setState({ anchorEl: e.currentTarget });
  }
  handleMenuItemClick(e, key) {
    this.setState({ selectedKey: key, anchorEl: null });
    this.props.onClickItemCategory(key);
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }
  render() {
    const { anchorEl } = this.state;
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.WARDROBE ? '' : 'none' }}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="wardrobe-item-category-menu"
            aria-label="アイテムカテゴリ"
            onClick={e => this.handleClickListItem(e)}
          >
            <ListItemText
              primary="アイテムカテゴリ"
              secondary={CONSTANTS.ITEM_CATEGORY_NAME.get(this.state.selectedKey)}
            />
          </ListItem>
        </List>
        <Menu
          id="wardrobe-item-category-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={e => this.handleClose(e)}
        >
          {Object.values(CONSTANTS.ITEM_CATEGORY).map(key => (
            <MenuItem
              key={key}
              selected={key === this.state.selectedKey}
              onClick={e => this.handleMenuItemClick(e, key)}
            >
              {CONSTANTS.ITEM_CATEGORY_NAME.get(key)}
            </MenuItem>
          ))}
        </Menu>
      </section>
    );
  }
}

ItemCategoryList.propTypes = {
  viewMode: PropTypes.number.isRequired,
  onClickItemCategory: PropTypes.func,
};

const mapStateToProps = state => ({
  viewMode: state.viewMode,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemCategoryList);
