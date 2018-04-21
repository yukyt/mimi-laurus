import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ItemCategoryList from '../components/ItemCategoryList';
import { setItemCategoryFilter } from '../actions/wardrobe';

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  itemCategoryFilter: state.itemCategoryFilter,
  onClickItemCategory: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  onClickItemCategory: (filter) => {
    dispatch(setItemCategoryFilter(filter));
  },
});

const Wardrobe = connect(mapStateToProps, mapDispatchToProps)(ItemCategoryList);
export default Wardrobe;
