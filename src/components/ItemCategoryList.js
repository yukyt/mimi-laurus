import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/Menu';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import * as CONSTANTS from '../define';

class ItemCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: CONSTANTS.ITEM_CATEGORY.HAIR,
      search: '',
    };
    this.handleChange = (e) => {
      const { onClickItemCategory } = this.props;
      this.setState({ category: e.target.value });
      onClickItemCategory(e.target.value);
    };
    this.searchTextChange = (e) => {
      const { onChangeSearchText } = this.props;
      this.setState({ search: e.target.value });
      onChangeSearchText(e.target.value);
    };
  }

  render() {
    const { viewMode } = this.props;
    const { category, search } = this.state;
    return (
      <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.WARDROBE ? '' : 'none' }}>
        <FormControl>
          <InputLabel htmlFor="wardrobe-item-category-select">Item Category</InputLabel>
          <Select
            value={category}
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
        <form>
          <TextField
            id="search"
            label="絞り込みキーワード"
            value={search}
            onChange={e => this.searchTextChange(e)}
            margin="normal"
          />
        </form>
      </section>
    );
  }
}

ItemCategoryList.propTypes = {
  viewMode: PropTypes.number.isRequired,
  onClickItemCategory: PropTypes.func.isRequired,
  onChangeSearchText: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(ItemCategoryList);
