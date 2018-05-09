import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ItemCategoryList from '../components/ItemCategoryList';
import { setItemCategoryFilter, setSearchText } from '../actions/wardrobe';

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  onClickItemCategory: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  onClickItemCategory: (filter) => {
    dispatch(setItemCategoryFilter(filter));
  },
  onChangeSearchText: (searchText) => {
    dispatch(setSearchText(searchText));
  },
});

const Wardrobe = connect(mapStateToProps, mapDispatchToProps)(ItemCategoryList);
export default Wardrobe;
