import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { chooseSection, chooseStage } from '../actions/stage';
import { calc, setHighScorePossessionFocus } from '../actions/simulator';
import * as CONSTANTS from '../define';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
class StageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: CONSTANTS.INIT_SECTION_ID,
      selectedStage: CONSTANTS.INIT_STAGE_ID,
    };

    this.handleChange = (event) => {
      const {
        stages, items, impossessions, bestCoordinates, onChangeSection, onChangeStage, onResetPos,
      } = this.props;
      this.setState({ [event.target.name]: event.target.value });
      if (event.target.name === 'section') {
        onChangeSection(event.target.value);
        this.setState({ selectedStage: '' });
      } else {
        onChangeStage(
          stages,
          items,
          event.target.value,
          impossessions,
        );
        onResetPos(bestCoordinates);
      }
    };
  }

  render() {
    const { viewMode, stages } = this.props;
    const { selectedSection, selectedStage } = this.state;
    return (
      <section style={{ display: viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
        <FormControl style={styles.formControl}>
          <InputLabel htmlFor="section-select">Section</InputLabel>
          <Select
            value={selectedSection}
            onChange={this.handleChange}
            style={{ width: '120px' }}
            inputProps={{
              name: 'section',
              id: 'section-select',
            }}
          >
            {Array.from(CONSTANTS.STAGE_SECTION.keys()).map(section => (
              <MenuItem
                key={section}
                value={section}
              >
                { CONSTANTS.STAGE_SECTION.get(section) }
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={styles.formControl}>
          <InputLabel htmlFor="stage-select">Stage</InputLabel>
          <Select
            value={selectedStage}
            onChange={this.handleChange}
            style={{ width: '320px' }}
            inputProps={{
              name: 'stage',
              id: 'stage-select',
            }}
          >
            {stages.map(stage => (
              <MenuItem key={stage.id} value={stage.id}>
                {stage.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
  impossessions: PropTypes.arrayOf(Number).isRequired,
  onChangeSection: PropTypes.func.isRequired,
  onChangeStage: PropTypes.func.isRequired,
  onResetPos: PropTypes.func.isRequired,
  bestCoordinates: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  viewMode: state.viewMode,
  stages: getVisibleStages(state.stages, state.sectionFilter),
  sectionFilter: state.sectionFilter,
  items: state.items,
  impossessions: state.impossessions,
  bestCoordinates: state.bestCoordinates,
});

const mapDispatchToProps = dispatch => ({
  onChangeSection: (sectionId) => {
    dispatch(chooseSection(sectionId));
  },
  onChangeStage: (stages, items, stageId, impossessions) => {
    dispatch(chooseStage(stageId));
    dispatch(calc(stages, items, stageId, impossessions));
  },
  onResetPos: (bestCoordinates) => {
    dispatch(setHighScorePossessionFocus(bestCoordinates));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StageList);
