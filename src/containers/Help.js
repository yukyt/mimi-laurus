import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as CONSTANTS from '../define';

const Help = (props) => {
  const { viewMode } = props;
  return (
    <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.HELP ? '' : 'none' }}>
      <h3>Description</h3>
      Mimi Laurusは
      <a href="https://miramiku.github.io/Laurus/" target="_blank" rel="noopener noreferrer">Laurus</a>
      （以下、オリジナル）をスマホ向けに再構築したものです。
      <ul>
        <li>衣装、ステージのデータはオリジナルのものを参照しています。</li>
        <li>スマホ向けに一部機能は省略されています。</li>
        <li>計算式などのオリジナルのソースを元に模倣しております。</li>
        <li>2018年5月現在、所持情報のデータ形式はオリジナルと互換性があり、相互に書き出し/読み込みが可能です。</li>
      </ul>
    </section>
  );
};

Help.propTypes = {
  viewMode: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});

export default connect(mapStateToProps)(Help);
