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
      section: CONSTANTS.INIT_SECTION_ID,
      stage: CONSTANTS.INIT_STAGE_ID,
    };

    this.handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
      if (event.target.name === 'section') {
        this.props.onChangeSection(event.target.value);
        this.setState({ stage: '' });
      } else {
        this.props.onChangeStage(
          this.props.stages,
          this.props.items,
          event.target.value,
          this.props.impossessions,
        );
        this.props.onResetPos(this.props.bestCoordinates);
      }
    };
  }

  render() {
    return (
      <section style={{ display: this.props.viewMode === CONSTANTS.VIEW_MODE.SIMULATOR ? '' : 'none' }}>
        <FormControl style={styles.formControl}>
          <InputLabel htmlFor="section-select">Section</InputLabel>
          <Select
            value={this.state.section}
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
            value={this.state.stage}
            onChange={this.handleChange}
            style={{ width: '320px' }}
            inputProps={{
            name: 'stage',
            id: 'stage-select',
          }}
          >
            {this.props.stages.map(stage => (
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
