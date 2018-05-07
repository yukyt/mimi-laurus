import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Snackbar from 'material-ui/Snackbar';
import * as CONSTANTS from '../define';
import { loadImpossessionFile } from '../actions/item';

class Load extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      message: '初期化中',
    };
  }
  onDropAccepted(files) {
    this.setState({
      open: true,
      message: 'ファイル読み込み中…',
    });
    this.reader = new FileReader();
    this.reader.onload = () => {
      const regex = new RegExp(/\[[0-9",]+\]$/);
      if (regex.test(this.reader.result)) {
        this.props.onLoadFile(JSON.parse(this.reader.result));
        this.setState({
          open: true,
          message: 'ファイル読み込みが完了しました。',
        });
      } else {
        this.setState({
          open: true,
          message: 'ファイル読み込みに失敗しました。ファイルの中身が正しくありません。',
        });
      }
    };
    this.reader.readAsText(files[0]);
  }
  onDropRejected() {
    this.setState({
      open: true,
      message: 'ファイル読み込みに失敗しました。jsonファイルをアップしてください。',
    });
  }
  handleClose() {
    this.setState({ open: false });
  }
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.LOAD ? '' : 'none' }}>
        開発中
        <div>
          <Dropzone
            onDropAccepted={e => this.onDropAccepted(e)}
            onDropRejected={e => this.onDropRejected(e)}
            accept="application/json"
          >
            <div>
                ファイルを指定またはドラッグ&ドロップしてください。
            </div>
          </Dropzone>
        </div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={5000}
          onClose={e => this.handleClose(e)}
          message={this.state.message}
        />
      </section>
    );
  }
}

Load.propTypes = {
  viewMode: PropTypes.number.isRequired,
  onLoadFile: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});
const mapDispatchToProps = dispatch => ({
  onLoadFile: (impossessions) => {
    dispatch(loadImpossessionFile(impossessions));
    // TODO re-calc
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Load);
