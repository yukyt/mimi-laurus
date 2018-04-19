import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { swipeItem } from '../actions/simulator';
import { toggleItem } from '../actions/wardrobe';
import Advisor from '../components/Advisor';

const getFocusItem = (bestCoordinates, focusItems) => {
  const results = {};
  for (const category in bestCoordinates) {
    results[category] =
      bestCoordinates[category].slice(focusItems[category], focusItems[category] + 3);
  }
  return results;
};

const mapStateToProps = state => ({
  bestCoordinates: getFocusItem(state.bestCoordinates, state.focusItems),
  focusItems: state.focusItems,
  viewMode: state.viewMode,
  next: PropTypes.func,
  prev: PropTypes.func,
  onItemClick: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  onItemClick: (itemId) => {
    dispatch(toggleItem(itemId));
  },
  next: (category, currentPos) => {
    dispatch(swipeItem(currentPos + 1, category));
  },
  prev: (category, currentPos) => {
    if (currentPos === 0) {
      return;
    }
    dispatch(swipeItem(currentPos - 1, category));
  },
});

const Simulator = connect(mapStateToProps, mapDispatchToProps)(Advisor);
export default Simulator;
