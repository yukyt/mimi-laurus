import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Button from 'material-ui/Button';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import NavigateNext from 'material-ui-icons/NavigateNext';
import RecommendItem from './RecommendItem';

// TODO css class is not working properly for Raised button.
const styles = {
  nav: {
    width: '40px',
    minWidth: '40px',
    boxSizing: 'borderBox',
  },
};

const itemClass = i => `item item${i}`;

const bestCoordinateShowCount = () => {
  if (window.matchMedia('(max-width: 690px)').matches) {
    return 1;
  } else if (window.matchMedia('(max-width: 930px)').matches) {
    return 2;
  }
  return 3;
};

class RecommendItemList extends Component {
  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props.bestCoordinates)
      !== JSON.stringify(nextProps.bestCoordinates));
  }
  render() {
    return (
      <div>
        {this.props.categoryName} {this.props.order + 1}位
        <div className="frame">
          <Button
            variant="raised"
            style={styles.nav}
            color="primary"
            onClick={() => this.props.prev(this.props.category, this.props.order)}
            disabled={this.props.order === 0}
          >
            {<NavigateBefore />}
          </Button>
          {this.props.bestCoordinates.slice(0, bestCoordinateShowCount()).map((bestCoordinate, i) =>
            (<RecommendItem
              key={bestCoordinate.id}
              item={bestCoordinate}
              itemClass={itemClass(i + 1)}
              onClick={this.props.onItemClick(bestCoordinate.id)}
            />))}
          <Button
            variant="raised"
            style={styles.nav}
            color="primary"
            onClick={() => this.props.next(this.props.category, this.props.order)}
            disabled={this.props.bestCoordinates.length === 1}
          >
            {<NavigateNext />}
          </Button>
        </div>
      </div>
    );
  }
}

RecommendItemList.propTypes = {
  category: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  bestCoordinates: PropTypes.arrayOf(Object).isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default RecommendItemList;
