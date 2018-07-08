import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { swipeItem } from '../actions/simulator';
import { toggleItem } from '../actions/wardrobe';
import Advisor from '../components/Advisor';

const mapStateToProps = state => ({
  bestCoordinates: state.bestCoordinates,
  focusItems: state.focusItems,
  viewMode: state.viewMode,
  selectedStage: state.selectedStage,
  getFocusItem: PropTypes.func,
  next: PropTypes.func,
  prev: PropTypes.func,
  onItemClick: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  onItemClick: (itemId) => {
    dispatch(toggleItem(itemId));
  },
  getFocusItem: (bestCoordinates, focusItems) => {
    const results = {};
    Object.keys(bestCoordinates).forEach((category) => {
      const pos = focusItems.get(parseInt(category, 10));
      results[category] = bestCoordinates[category].slice(pos, pos + 3);
    });
    return results;
  },
  next: (category, currentPos) => {
    dispatch(swipeItem(category, currentPos + 1));
  },
  prev: (category, currentPos) => {
    if (currentPos === 0) {
      return;
    }
    dispatch(swipeItem(category, currentPos - 1));
  },
});

const Simulator = connect(mapStateToProps, mapDispatchToProps)(Advisor);
export default Simulator;
