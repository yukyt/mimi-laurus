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
    if (this.props.selectedStage !== 'NONE' && this.props.selectedStage !== nextProps.selectedStage) {
      this.props.onStageChange(nextProps.bestCoordinates);
    }
  }
  getFocusItem(category) {
    const pos = this.props.focusItems.get(Number(category));
    return this.props.bestCoordinates[category].slice(pos, pos + 3);
  }
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
        {nowRendering(Object.keys(this.props.bestCoordinates).length === 0)}
        {Object.keys(this.props.bestCoordinates).map(category =>
          (<RecommendItemList
            key={Number(category)}
            category={Number(category)}
            categoryName={CONSTANTS.ITEM_CATEGORY_NAME.get(Number(category))}
            order={this.props.focusItems.get(Number(category))}
            next={this.props.next}
            prev={this.props.prev}
            slicedCategoryBestCoordinates={this.getFocusItem(category)}
            onItemClick={() => this.props.onItemClick}
          />))
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
