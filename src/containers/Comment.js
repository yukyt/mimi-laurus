import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../define';

const Comment = (props) => {
  const { viewMode } = props;
  return (
    <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.COMMENT ? '' : 'none' }}>
      <div>ゲスト投稿の場合、メールアドレスは架空のもので大丈夫です。</div>
      <iframe
        src="./comment.html"
        title="comment"
        style={{
          border: 0,
          width: '100%',
          height: '80vh',
          padding: 0,
          margin: 0,
        }}
      />
    </section>
  );
};

Comment.propTypes = {
  viewMode: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(Comment);
