import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../define';

const Comment = props => (
  <section style={{ display: props.viewMode === CONSTANTS.VIEW_MODE.COMMENT ? '' : 'none' }}>
    <div>ゲスト投稿の場合、メールアドレスは架空のもので大丈夫です。</div>
    <div>コメントフォームが表示されない場合、お手数ですが何度かリロードしてみてください。</div>
    <div id="disqus_thread" />
  </section>
);

Comment.propTypes = {
  viewMode: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(Comment);
