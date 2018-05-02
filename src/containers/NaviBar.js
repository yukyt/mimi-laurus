import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
import { AppBar, MenuItem } from 'material-ui';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
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
    const drawerContent = (
      <div>
        <div>Mini Laurus</div>
        <div style={{ fontSize: '11px' }}>ver. alpha</div>
        <Divider />
        <MenuItem onClick={() =>
          this.props.onMenuItemClick(CONSTANTS.VIEW_MODE.SIMULATOR)}
        >
          推奨コーデ
        </MenuItem>
        <MenuItem onClick={() =>
          this.props.onMenuItemClick(CONSTANTS.VIEW_MODE.WARDROBE)}
        >
          ワードローブ
        </MenuItem>
        <Divider />
        <MenuItem onClick={() =>
          this.props.onMenuItemClick(CONSTANTS.VIEW_MODE.SAVE)}
        >
          ファイル書出
        </MenuItem>
        <MenuItem onClick={() =>
          this.props.onMenuItemClick(CONSTANTS.VIEW_MODE.LOAD)}
        >
          ファイル読込
        </MenuItem>
        <Divider />
        <MenuItem onClick={() =>
          this.props.onMenuItemClick(CONSTANTS.VIEW_MODE.HELP)}
        >
          ヘルプ
        </MenuItem>
      </div>
    );
    return (
      <div>
        <Hidden mdUp>
          <SwipeableDrawer
            variant="temporary"
            open={this.state.open}
            onClose={() => this.onToggle(false)}
            onOpen={() => this.onToggle(true)}
            swipeAreaWidth={10}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerContent}
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <AppBar position="static" id="appBar">
          <Toolbar>
            <IconButton
              id="menuIcon"
              color="inherit"
              aria-label="Menu"
              onClick={() => this.onToggle(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              {CONSTANTS.VIEW_NAME_NAME.get(this.props.viewMode)}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NaviBar.propTypes = {
  viewMode: PropTypes.number.isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  viewMode: state.viewMode,
});
const mapDispatchToProps = dispatch => ({
  onMenuItemClick: v => dispatch(clickMenuItem(v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NaviBar);
