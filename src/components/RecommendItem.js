import React from 'react';
import { PropTypes } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

const possessionStyle = (possession) => {
  if (possession) {
    return {};
  }
  return { backgroundColor: 'lightgray' };
};

const RecommendItem = ({
  item, itemClass, onClick,
}) => (
  <Paper className={itemClass} style={possessionStyle(item.possession)}>
    <Fab
      color="secondary"
      className="item__possession-button"
      style={{ display: (item.id) ? 'inline-block' : 'none' }}
      onClick={() => onClick(item.id)}
    >
      {(() => {
        if (item.possession) {
          return <DeleteForeverIcon className="item__possession-button-icon" />;
        }
        return (<AddToPhotosIcon className="item__possession-button-icon" />);
      })()}
    </Fab>
    <div className="item__detail">
      <div className="item__header">
        <span className="item__possession">
          {(() => ((!item.possession) ? '[非所持]' : ''))()}
        </span>
        <span className="item__name">{item.name}</span>
      </div>
      <div className="item__score" style={{ display: (item.id) ? 'block' : 'none' }}>
        {item.score}点
      </div>
    </div>
  </Paper>
);

RecommendItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    possession: PropTypes.bool.isRequired,
  }).isRequired,
  itemClass: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecommendItem;
