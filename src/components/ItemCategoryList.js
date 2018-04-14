import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import * as CONSTANTS from '../define';
import { setItemCategoryFilter } from '../actions/wardrobe';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    display: 'flex',
    flexDirection: 'row !important',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
});

class ItemCategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCategory: String(CONSTANTS.ITEM_CATEGORY.HAIR),
    };
    this.handleChange = (event) => {
      this.setState({ itemCategory: event.target.value });
      this.props.onClickItemCategory(parseInt(event.target.value, 10));
    };
  }

  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.WARDROBE ? '' : 'none' }}>
        <FormControl component="fieldset" style={styles.formControl}>
          <FormLabel component="legend">Item category</FormLabel>
          <RadioGroup
            aria-label="item-category"
            name="item-category"
            className="itemCategories"
            value={this.state.itemCategory}
            onChange={this.handleChange}
          >
            {Object.values(CONSTANTS.ITEM_CATEGORY).map(key => (
              <FormControlLabel
                key={key}
                value={String(key)}
                control={<Radio />}
                className="itemCategory"
                label={CONSTANTS.ITEM_CATEGORY_NAME.get(key)}
              />
            ))}
          </RadioGroup>
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
  onClickItemCategory: (filter) => {
    dispatch(setItemCategoryFilter(filter));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemCategoryList);

