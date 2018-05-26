import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../define';

const Comment = props => (
  <section style={{ display: props.viewMode === CONSTANTS.VIEW_MODE.COMMENT ? '' : 'none' }}>
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
