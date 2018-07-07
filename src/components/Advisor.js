import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import RecommendItemList from './RecommendItemList';
import * as CONSTANTS from '../define';

const nowRendering = isRendering => ((isRendering) ? (<CircularProgress className="loading" />) : '');

class Advisor extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    if (this.props.selectedStage !== nextProps.selectedStage) {
      console.log('stageChange');
      console.log(nextProps.selectedStage);
      console.log(nextProps.slicedBestCoordinates);
    }
  }
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
        {nowRendering(Object.keys(this.props.slicedBestCoordinates).length === 0)}
        {Object.keys(this.props.slicedBestCoordinates).map(category =>
          (<RecommendItemList
            key={parseInt(category, 10)}
            category={parseInt(category, 10)}
            categoryName={CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10))}
            order={this.props.focusItems.get(parseInt(category, 10))}
            next={this.props.next}
            prev={this.props.prev}
            slicedCategoryBestCoordinates={this.props.slicedBestCoordinates[category]}
            onItemClick={() => this.props.onItemClick}
          />))
        }
      </section>
    );
  }
}

Advisor.propTypes = {
  slicedBestCoordinates: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  focusItems: PropTypes.instanceOf(Map).isRequired,
  viewMode: PropTypes.number.isRequired,
  selectedStage: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(Advisor);
