import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import * as CONSTANTS from '../define';

const download = () => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  const json = localStorage.getItem('impossessions');
  const blob = new Blob([json], { type: 'octet/stream' });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'myMimiLaurus.json';
  a.click();
  window.URL.revokeObjectURL(url);
};

class Save extends Component {
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.SAVE ? '' : 'none' }}>
        <Button
          aria-label="Save"
          variant="raised"
          color="primary"
          onClick={download}
        >
          <FileDownloadIcon />
          書き出し
        </Button>
      </section>
    );
  }
}

Save.propTypes = {
  viewMode: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Save);
