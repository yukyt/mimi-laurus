import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import NavigateNext from 'material-ui-icons/NavigateNext';
import MenuIcon from 'material-ui-icons/Menu';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import * as CONSTANTS from '../define';
import { swipeItem } from '../actions/simulator';

const itemClass = i => `item item${i}`;

// TODO css class is not working properly for Raised button.
const styles = {
  nav: {
    width: '40px',
    minWidth: '40px',
    boxSizing: 'borderBox',
  },
};

const possessionStyle = (possession) => {
  if (possession) {
    return null;
  }
  return { backgroundColor: 'gray' };
};

const bestCoordinateShowCount = () => {
  if (window.matchMedia('(max-width: 690px)').matches) {
    return 1;
  } else if (window.matchMedia('(max-width: 930px)').matches) {
    return 2;
  }
  return 3;
};

class Simulator extends Component {
  render() {
    const categoryHtml = [];
    for (const category in this.props.bestCoordinates) {
      const categoryName = CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10));
      const pos = this.props.focusItems[category] + 1;
      const itemHtml = [];
      let i = 1;

      for (const item of this.props.bestCoordinates[category].slice(0, bestCoordinateShowCount())) {
        itemHtml.push((
          <Paper key={item.id} className={itemClass(i)} style={possessionStyle(item.possession)}>
            <div>
              <div className="name">{item.name}</div>
              <div className="score">{item.score}点</div>
            </div>
            <Tooltip id="tooltip-icon" title="something">
              <IconButton aria-label="Menu" className="menu">
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        ));
        i++;
      }
      categoryHtml.push((
        <div key={category}>
          {categoryName} {pos}位
          <div className="frame">
            <Button
              variant="raised"
              style={styles.nav}
              color="primary"
              onClick={() => this.props.prev(category, this.props.focusItems[category])}
              disabled={this.props.focusItems[category] === 0}
            >
              {<NavigateBefore />}
            </Button>
            {itemHtml}
            <Button
              variant="raised"
              style={styles.nav}
              color="primary"
              onClick={() => this.props.next(category, this.props.focusItems[category])}
              disabled={this.props.bestCoordinates[category].length === 1}
            >
              {<NavigateNext />}
            </Button>
          </div>
        </div>
      ));
    }
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
        {categoryHtml}
      </section>
    );
  }
}

const getFocusItem = (bestCoordinates, focusItems) => {
  const results = {};
  for (const category in bestCoordinates) {
    results[category] =
      bestCoordinates[category].slice(focusItems[category], focusItems[category] + 3);
  }
  return results;
};

Simulator.propTypes = {
  viewMode: PropTypes.number.isRequired,
  bestCoordinates: PropTypes.objectOf(Object).isRequired,
  focusItems: PropTypes.arrayOf(Object).isRequired,
  next: PropTypes.func,
  prev: PropTypes.func,
};

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  bestCoordinates: getFocusItem(state.bestCoordinates, state.focusItems),
  focusItems: state.focusItems,
});

const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Simulator);
