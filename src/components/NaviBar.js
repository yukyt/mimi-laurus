import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
import { AppBar, MenuItem } from 'material-ui';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { clickMenuItem } from '../actions/menu';
import * as CONSTANTS from '../define';

class NaviBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  onToggle(openStatus) {
    this.setState({
      open: openStatus,
    });
  }
  render() {
    return (
      <div>
        <SwipeableDrawer
          open={this.state.open}
          onClose={() => this.onToggle(false)}
          onOpen={() => this.onToggle(true)}
        >
          <MenuItem>Smart Laurus</MenuItem>
          <Divider />
          <MenuItem onClick={() => this.props.onMenuItemClick(CONSTANTS.VIEW_MODE.SIMULATOR)}>推奨コーデ</MenuItem>
          <MenuItem onClick={() => this.props.onMenuItemClick(CONSTANTS.VIEW_MODE.WARDROBE)}>ワードローブ</MenuItem>
          <MenuItem onClick={() => this.props.onMenuItemClick(CONSTANTS.VIEW_MODE.HELP)}>ヘルプ</MenuItem>
        </SwipeableDrawer>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={() => this.onToggle(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Smart Laurus
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NaviBar.propTypes = {
  onMenuItemClick: PropTypes.func.isRequired,
};
const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  onMenuItemClick: v => dispatch(clickMenuItem(v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NaviBar);
