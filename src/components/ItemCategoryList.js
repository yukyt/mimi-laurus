import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';
import * as CONSTANTS from '../define';

class ItemCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: CONSTANTS.ITEM_CATEGORY.HAIR,
    };
    this.handleChange = (e) => {
      this.setState({ category: e.target.value });
      this.props.onClickItemCategory(e.target.value);
    };
  };

  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.WARDROBE ? '' : 'none' }}>
        <FormControl>
          <InputLabel htmlFor="wardrobe-item-category-select">Item Category</InputLabel>
          <Select
            value={this.state.category}
            onChange={this.handleChange}
            style={{ width: '200px' }}
            inputProps={{
              id: 'wardrobe-item-category-select',
            }}
          >
            {Object.values(CONSTANTS.ITEM_CATEGORY).map(key => (
              <MenuItem
                key={key}
                value={key}
              >
                {CONSTANTS.ITEM_CATEGORY_NAME.get(key)}
              </MenuItem>
          ))}
          </Select>
        </FormControl>
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
