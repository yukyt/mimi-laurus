import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../define';

class Help extends Component {
  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.HELP ? '' : 'none' }}>
        <h3>Description</h3>
        Mimi Laurusは<a href="https://miramiku.github.io/Laurus/" target="_blank" rel="noopener noreferrer">Laurus</a>（以下、本家）をスマホ向けに再構築したものです。
        <ul>
          <li>衣装、ステージのデータは本家のものを参照しています。</li>
          <li>スマホ向けに一部機能は省略されています。</li>
          <li>計算式などは本家のソースを元に模倣しております。（が、今はペナルティ、ブラックリストなどが非対応のため大きく異なります）</li>
          <li>2018年5月現在、所持情報のデータ形式は本家と互換性があり、相互に書き出し/読み込みが可能です。</li>
        </ul>
        <hr />
        <h3>Inquiry</h3>
        なにかあればGithubの<a href="https://github.com/yukyt/mimi-laurus/issues" target="_blank" rel="noopener noreferrer">Issue</a>にお願いします。
      </section>
    );
  }
}

Help.propTypes = {
  viewMode: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(Help);
