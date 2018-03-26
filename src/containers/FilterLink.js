import { connect } from 'react-redux';
import { setItemCategoryFilter } from '../actions/item';
import Link from '../components/Link';

const mapStateToProps = state => ({ state });

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setItemCategoryFilter(ownProps.filter));
  },
});

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);

export default FilterLink;
