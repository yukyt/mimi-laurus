import React from 'react';
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

const Save = props => (
  <section style={{ display: props.viewMode === CONSTANTS.VIEW_MODE.SAVE_LOAD ? '' : 'none' }}>
    <div>
          非所持アイテム情報をファイルに書き出します。
    </div>
    <Button
      aria-label="Save"
      variant="raised"
      color="secondary"
      onClick={download}
    >
      <FileDownloadIcon />
          書き出し
    </Button>
  </section>
);

Save.propTypes = {
  viewMode: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(Save);
