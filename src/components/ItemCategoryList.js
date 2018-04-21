import React from 'react';
import { PropTypes } from 'prop-types';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import * as CONSTANTS from '../define';

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

const ItemCategoryList = ({
  viewMode, itemCategoryFilter, onClickItemCategory,
}) => (
  <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.WARDROBE ? '' : 'none' }}>
    <FormControl component="fieldset" style={styles.formControl}>
      <FormLabel component="legend">Item category</FormLabel>
      <RadioGroup
        aria-label="item-category"
        name="item-category"
        className="itemCategories"
        value={String(itemCategoryFilter)}
        onChange={e => onClickItemCategory(parseInt(e.target.value, 10))}
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

ItemCategoryList.propTypes = {
  viewMode: PropTypes.number.isRequired,
  itemCategoryFilter: PropTypes.number.isRequired,
  onClickItemCategory: PropTypes.func,
};

export default ItemCategoryList;
