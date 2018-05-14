import React from 'react';
import { PropTypes } from 'prop-types';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import AddToPhotosIcon from 'material-ui-icons/AddToPhotos';


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
    <Button
      variant="fab"
      color="primary"
      className="possession-button"
      style={{ display: (item.id) ? 'inline-block' : 'none' }}
      onClick={() => onClick(item.id)}
    >
      {(() => {
        if (item.possession) {
          return <DeleteForeverIcon className="possession-button-icon" />;
        }
        return (<AddToPhotosIcon className="possession-button-icon" />);
      })()}
    </Button>
    <div className="detail">
      <div className="header">
        <span className="possession">
          {(() => ((!item.possession) ? '[非所持]' : ''))()}
        </span>
        <span className="name">{item.name}</span>
      </div>
      <div className="score" style={{ display: (item.id) ? 'block' : 'none' }}>{item.score}点</div>
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
