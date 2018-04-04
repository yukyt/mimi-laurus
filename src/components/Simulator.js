import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as CONSTANTS from '../define';

// TODO use class.
const styles = {
  item: {
    width: '300px',
    card: {
      margin: '5px',
      padding: '5px',
      backgroundColor: '#00bcd4',
      name: {
      },
      score: {
      },
    },
  },
};

class Simulator extends Component {
  render() {
    const settings = {
      dots: false,
      lazyLoad: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
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
        <div key={category}>
          {categoryName}
          <Slider {...settings}>
            {itemHtml}
          </Slider>
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
