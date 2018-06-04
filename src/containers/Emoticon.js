import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import * as CONSTANTS from '../define';

const emoticons = () => [
  'ヽ(。ゝω・。)ﾉ',
  'Σ(･ω･ﾉ)ﾉ',
  '(〃艸〃)',
  '(ˊ艸ˋ)',
  '( 乂 \'ω\' )',
  '( º言º)',
  '(*-ω人)',
  '(*\' \')*, ,) ぺこっ',
  'm(_ _)m',
  'Σ(ºﾛº)',
  '(；；)',
  '(T_T)',
  '(ΦωΦ)',
  '(\'ω\')',
];

class Emoticon extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  execCopy(copyText) {
    const temp = document.createElement('div');
    temp.appendChild(document.createElement('pre')).textContent = copyText;
    const s = temp.style;
    s.position = 'fixed';
    s.left = '-100%';
    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);
    document.execCommand('copy');
    document.body.removeChild(temp);
    this.setState({
      open: true,
    });
  }
  handleClose() {
    this.setState({ open: false });
  }
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.EMMOTICON ? '' : 'none' }}>
        ニキは使用可能な文字種の制限が厳しいので、利用しやすいように一覧を作ってみました。<br />
        入力できないものがあった場合は、コメントにて、Androidかiphoneかを添えて教えてくださいm(_ _)m<br />
        {emoticons().map((text, index) => (
          <Button
            key={text}
            style={{ textTransform: 'none' }}
            onClick={() => this.execCopy(text)}
          >
            {index + 1}. {text}
          </Button>
        ))}
        <Snackbar
          open={this.state.open}
          autoHideDuration={5000}
          onClose={e => this.handleClose(e)}
          message="クリップボードにコピーしました。"
        />
      </section>
    );
  }
}

Emoticon.propTypes = {
  viewMode: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(Emoticon);
