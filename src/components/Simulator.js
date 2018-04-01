import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import InfiniteCarousel from 'react-leaf-carousel';
import * as CONSTANTS from '../define';

// TODO use class.
const styles = {
  frame: {
    maxWidth: '1000px',
  },
  item: {
    width: '300px',
    margin: '10px',
    height: '60px',
    card: {
      margin: '5px',
      padding: '5px',
      height: '50px',
      backgroundColor: '#00bcd4',
      name: {
        padding: '0',
        margin: '0',
      },
      score: {
        padding: '0',
        margin: '0',
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
          <div key={item.id} style={styles.item}>
            <div style={styles.item.card}>
              <span style={styles.item.card.name}>{item.name}</span><br />
              <span style={styles.item.card.score}>{item.score}</span>
            </div>
          </div>
        ));
      }
      categoryHtml.push((
        <div key={category} style={styles.frame}>
          {categoryName}
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
            ]}
            arrows
            dots={false}
            swipe
            lazyLoad
            showSides
            showSpacing={10}
            sidesOpacity={0.5}
            sideSize={0.1}
            slidesToScroll={1}
            slidesToShow={3}
            scrollOnDevice
            responsive
            autoCycle={false}
            styles={styles.frame}
          >
            {itemHtml}
          </InfiniteCarousel>
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

Simulator.propTypes = {
  viewMode: PropTypes.number.isRequired,
  bestCoordinates: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  bestCoordinates: state.bestCoordinates,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulator);
