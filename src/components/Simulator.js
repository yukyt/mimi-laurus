import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import NavigateNext from 'material-ui/svg-icons/image/navigate-next';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as CONSTANTS from '../define';
import { swipeItem } from '../actions/simulator';

const itemClass = i => `item item${i}`;

// TODO css class is not working properly for Raised button.
const styles = {
  nav: {
    width: '30px',
    minWidth: '30px',
  },
};

const possessionStyle = (possession) => {
  console.log(possession);
  if (possession) {
    return null;
  }
  return { backgroundColor: 'gray' };
};

class Simulator extends Component {
  render() {
    const categoryHtml = [];
    for (const category in this.props.bestCoordinates) {
      const categoryName = CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10));
      const pos = this.props.focusItems[category] + 1;
      const itemHtml = [];
      let i = 1;
      for (const item of this.props.bestCoordinates[category]) {
        itemHtml.push((
          <Paper key={item.id} className={itemClass(i)} style={possessionStyle(item.possession)} zDepth={1}>
            <span className="name">{item.name}</span>
            <span className="score">{item.score}点</span>
          </Paper>
        ));
        i++;
      }
      categoryHtml.push((
        <MuiThemeProvider key={category}>
          {categoryName} {pos}位
          <div className="frame">
            <RaisedButton
              icon={<NavigateBefore />}
              style={styles.nav}
              onClick={() => this.props.prev(category, this.props.focusItems[category])}
            />
            <div
              style={{ display: 'inline-block' }}
            >
              {itemHtml}
            </div>
            <RaisedButton
              icon={<NavigateNext />}
              style={styles.nav}
              onClick={() => this.props.next(category, this.props.focusItems[category], this.props.bestCoordinates[category].length)}
            />
          </div>
        </MuiThemeProvider>
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
    let pos = 0;
    if (focusItems[category]) {
      pos = focusItems[category];
    }
    const maxPos = (bestCoordinates[category].length <= pos + 3) ? bestCoordinates[category].length : pos + 3;
    results[category] =
      bestCoordinates[category].slice(pos, maxPos);
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
  next: (category, currentPos, maxPos) => {
    if (maxPos === 1) {
      return;
    }
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
