import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import RecommendItemList from './RecommendItemList';
import * as CONSTANTS from '../define';
import { setHighScorePossessionFocus } from '../actions/simulator';

const nowRendering = isRendering => ((isRendering) ? (<CircularProgress className="loading" />) : '');

class Advisor extends Component {
  componentWillReceiveProps(nextProps) {
    // if stage is changed, reset focus.
    const { selectedStage, onStageChange } = this.props;
    if (selectedStage !== 'NONE' && selectedStage !== nextProps.selectedStage) {
      onStageChange(nextProps.bestCoordinates);
    }
  }

  getFocusItem(category) {
    const { focusItems, bestCoordinates } = this.props;
    const pos = focusItems.get(Number(category));
    return bestCoordinates[category].slice(pos, pos + 3);
  }

  render() {
    const {
      viewMode, bestCoordinates, focusItems, next, prev, onItemClick,
    } = this.props;
    return (
      <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
        {nowRendering(Object.keys(bestCoordinates).length === 0)}
        {Object.keys(bestCoordinates).map(category => (
          <RecommendItemList
            key={Number(category)}
            category={Number(category)}
            categoryName={CONSTANTS.ITEM_CATEGORY_NAME.get(Number(category))}
            order={focusItems.get(Number(category))}
            next={next}
            prev={prev}
            slicedCategoryBestCoordinates={this.getFocusItem(category)}
            onItemClick={() => onItemClick}
          />
        ))
        }
      </section>
    );
  }
}

Advisor.propTypes = {
  bestCoordinates: PropTypes.shape({}).isRequired,
  focusItems: PropTypes.instanceOf(Map).isRequired,
  viewMode: PropTypes.number.isRequired,
  selectedStage: PropTypes.string.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onStageChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bestCoordinates: state.bestCoordinates,
  viewMode: state.viewMode,
});

const mapDispatchToProps = dispatch => ({
  onStageChange: (bestCoordinates) => {
    dispatch(setHighScorePossessionFocus(bestCoordinates));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Advisor);
