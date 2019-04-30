import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import * as CONSTANTS from '../define';
import { loadImpossessionFile } from '../actions/item';
import { calc } from '../actions/simulator';

class Load extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      message: '初期化中',
    };
  }

  onDropAccepted(files, stages, items, selectedStage) {
    const { onLoadFile } = this.props;
    this.setState({
      open: true,
      message: 'ファイル読み込み中…',
    });
    this.reader = new FileReader();
    this.reader.onload = () => {
      const regex = new RegExp(/\[[0-9",]+\]$/);
      if (regex.test(this.reader.result) || this.reader.result === '[]') {
        const impossessions = JSON.parse(this.reader.result);
        localStorage.setItem('impossessions', JSON.stringify(impossessions)); // string
        onLoadFile(
          impossessions.map(v => Number(v)), // number
          stages,
          items,
          selectedStage,
        );
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

  confirmReset(e, stages, items, selectedStage) {
    const { onLoadFile } = this.props;
    if (window.confirm('本当によろしいですか？')) { // eslint-disable-line no-alert
      localStorage.removeItem('impossessions');
      onLoadFile(
        [],
        stages,
        items,
        selectedStage,
      );
      this.setState({
        open: true,
        message: '全て所持状態に戻りました。',
      });
    }
  }

  render() {
    const {
      viewMode, stages, items, selectedStage,
    } = this.props;
    const {
      open, message,
    } = this.state;
    return (
      <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.SAVE_LOAD ? '' : 'none' }}>
        <div>
          非所持アイテム情報をファイルから読み込みます。
        </div>
        <div>
          <Dropzone
            onDropAccepted={e => this.onDropAccepted(
              e,
              stages,
              items,
              selectedStage,
            )}
            onDropRejected={e => this.onDropRejected(e)}
            accept="application/json"
          >
            <div>
                ファイルを指定またはドラッグ&ドロップしてください。
            </div>
          </Dropzone>
        </div>
        <Button
          aria-label="Reset"
          variant="contained"
          color="secondary"
          className="button"
          onClick={e => this.confirmReset(
            e,
            stages,
            items,
            selectedStage,
          )}
        >
          <RefreshIcon />
            全て所持に戻す
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={e => this.handleClose(e)}
          message={message}
        />
      </section>
    );
  }
}

Load.propTypes = {
  viewMode: PropTypes.number.isRequired,
  onLoadFile: PropTypes.func.isRequired,
  stages: PropTypes.arrayOf(Object).isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
  selectedStage: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
  stages: state.stages,
  items: state.items,
  selectedStage: state.selectedStage,
});
const mapDispatchToProps = dispatch => ({
  onLoadFile: (impossessions, stages, items, selectedStage) => {
    dispatch(loadImpossessionFile(impossessions));
    // re-calc
    dispatch(calc(stages, items, selectedStage, impossessions));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Load);
