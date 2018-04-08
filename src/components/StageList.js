import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { chooseSection } from '../actions/stage';
import { calc } from '../actions/simulator';
import * as CONSTANTS from '../define';

class StageList extends Component {
  constructor(props) {
    super(props);
    this.state = { section: 'colosseum' };
  }

  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
        <h3>Stage</h3>
        <MuiThemeProvider>
          <DropDownMenu
            id="section"
            autoWidth
            value={this.state.section}
            onChange={(e, index, value) => {
              this.setState({ section: value });
              this.props.onChangeSection(value);
            }}
          >
            {Array.from(CONSTANTS.STAGE_SECTION.keys()).map(section => (
              <MenuItem key={section} value={section} primaryText={CONSTANTS.STAGE_SECTION.get(section)} />
            ))}
          </DropDownMenu>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <DropDownMenu
            id="stage"
            autoWidth
            value={this.state.stage}
            onChange={(e, index, value) => {
              this.setState({ stage: value });
              this.props.onChangeStage(this.props.stages, this.props.items, value);
            }}
          >
            {this.props.stages.map(stage => (
              <MenuItem key={stage.id} value={stage.id} primaryText={stage.name} />
            ))}
          </DropDownMenu>
        </MuiThemeProvider>
      </section>
    );
  }
}

const getVisibleStages = (stages, sectionFilter) => {
  switch (sectionFilter) {
    case 'colosseum':
      return stages.filter(stage => (stage.section === 'colosseum'));
    case 'guild':
      return stages.filter(stage => (stage.section === 'guild'));
    case 'event':
      return stages.filter(stage => (stage.section === 'event'));
    case 'scenario':
      return stages.filter(stage => (stage.section === 'scenario'));
    default:
      return stages.filter(stage => (stage.section === 'colosseum'));
  }
};

StageList.propTypes = {
  viewMode: PropTypes.number.isRequired,
  stages: PropTypes.arrayOf(Object).isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
  onChangeSection: PropTypes.func,
  onChangeStage: PropTypes.func,
};

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  stages: getVisibleStages(state.stages, state.sectionFilter),
  sectionFilter: state.sectionFilter,
  items: state.items,
});

const mapDispatchToProps = dispatch => ({
  onChangeSection: (sectionId) => {
    dispatch(chooseSection(sectionId));
  },
  onChangeStage: (stages, items, stageId) => {
    dispatch(calc(stages, items, stageId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StageList);
