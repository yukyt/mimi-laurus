import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../define';

class Simulator extends Component {
  render() {
    const list = [];
    for (const category in this.props.bestCoordinates) {
      let i = 0;
      for (const item of this.props.bestCoordinates[category]) {
        list.push(<li key={category + item.id} style={{ display: i === 0 ? 'block' : 'none' }}>{CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10))}:{item.name}:{item.score}点</li>,);
        i++;
      }
    }
    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

const getFocusItem = (bestCoordinates, focusItems) => {
  const results = {};
  for (const category in bestCoordinates) {
    // TODO implement selectable list. (always top item now)
    results[category] = [bestCoordinates[category][0]];
  }
  return results;
};

Simulator.propTypes = {
  bestCoordinates: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = state => ({
  bestCoordinates: getFocusItem(state.bestCoordinates, state.focusItems),
  focusItems: state.focusItems,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulator);
