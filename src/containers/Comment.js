import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ReactDisqusComments from 'react-disqus-comments';
import * as CONSTANTS from '../define';

const Comment = props => (
  <section style={{ display: props.viewMode === CONSTANTS.VIEW_MODE.COMMENT ? '' : 'none' }}>
    <ReactDisqusComments
      shortname="mimi-laurus"
      identifier="mimi-laurus"
      title="Mimi Laurus"
      url="http://yukyt.github.io/mimi-laurus/"
    />
  </section>
);

Comment.propTypes = {
  viewMode: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(Comment);
