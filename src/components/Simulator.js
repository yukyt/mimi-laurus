import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import * as CONSTANTS from '../define';

// TODO use class.
const styles = {
  frame: {
    height: '50px',
    maxWidth: '900px',
  },
  item: {
    width: '300px',
    height: '50px',
    display: 'inline-block',
    card: {
      margin: '5px',
      padding: '5px',
      height: '30px',
      backgroundColor: '#00bcd4',
      name: {
        fontSize: '14px',
      },
      score: {
        fontSize: '12px',
      },
    },
  },
};

class Simulator extends Component {
  render() {
    const categoryHtml = [];
    for (const category in this.props.bestCoordinates) {
      const categoryName = CONSTANTS.ITEM_CATEGORY_NAME.get(parseInt(category, 10));
      const itemHtml = [];
      for (const item of this.props.bestCoordinates[category]) {
        itemHtml.push((
          <View key={item.id} className="view" style={styles.item}>
            <div style={styles.item.card}>
              <span style={styles.item.card.name}>{item.name}</span>
              <span style={styles.item.card.score}>{item.score}点</span>
            </div>
          </View>
        ));
      }
      categoryHtml.push((
        <ViewPager tag="main" key={category}>
          {categoryName}
          <Frame className="frame" style={styles.frame}>
            <Track
              ref={(c) => {
                this.track = c;
                return this.track;
              }}
              viewsToShow="auto"
              infinite={false}
              className="track"
            >
              {itemHtml}
            </Track>
          </Frame>
        </ViewPager>
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
    // TODO implement selectable list. (always top item now)
    results[category] = bestCoordinates[category];
  }
  return results;
};

Simulator.propTypes = {
  viewMode: PropTypes.number.isRequired,
  bestCoordinates: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  bestCoordinates: getFocusItem(state.bestCoordinates, state.focusItems),
  focusItems: state.focusItems,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulator);
