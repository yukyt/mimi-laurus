import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as CONSTANTS from '../define';
import { loadImpossessionFile } from '../actions/item';

class Load extends Component {
  onDropAccepted(files) {
    console.log('file upload accepted');
    this.reader = new FileReader();
    this.reader.onload = () => {
      // TODO validation
      this.props.onLoadFile(JSON.parse(this.reader.result));
      // TODO notice
      console.log('file upload success');
    };
    this.reader.readAsText(files[0]);
  }
  onDropRejected() {
      // TODO notice
      console.log('file upload rejected');
  }
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.LOAD ? '' : 'none' }}>
        開発中
        <div>
          <Dropzone
            onDropAccepted={e => this.onDropAccepted(e)}
            onDropRejected={this.onDropRejected}
            accept="application/json"
          >
            <div>
                ファイルを指定またはドラッグ&ドロップしてください。
            </div>
          </Dropzone>
        </div>
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
