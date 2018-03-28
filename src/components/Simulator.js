import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../define';

class Simulator extends Component {
  render() {
    return (
      <div>
        {Array.from(this.props.bestCoordinates).map(([key, value]) => (
          <span key={value.name}>{CONSTANTS.ITEM_CATEGORY_NAME.get(key)}: {value.name} {value.score}点<br /></span>
        ))}
      </div>
    );
  }
}

Simulator.propTypes = {
  bestCoordinates: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = state => ({
  bestCoordinates: state.bestCoordinates,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulator);
