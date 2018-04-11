import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';
import { chooseSection } from '../actions/stage';
import { calc } from '../actions/simulator';
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
      section: 'colosseum',
      stage: '',
    };

    this.handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
      if (event.target.name === 'section') {
        this.props.onChangeSection(event.target.value);
        this.setState({ stage: '' });
      } else {
        this.props.onChangeStage(this.props.stages, this.props.items, event.target.value);
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
