import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { AppBar, MenuItem } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
    const { onMenuItemClick, viewMode } = this.props;
    const { open } = this.state;
    const drawerContent = (
      <div>
        <div className="naviBar__title">
          Mimi Laurus
        </div>
        <div className="naviBar__version">
          ver. alpha
        </div>
        <Divider />
        <MenuItem
          onClick={() => onMenuItemClick(CONSTANTS.VIEW_MODE.SIMULATOR)}
          className="naviBar__menu"
        >
          おすすめコーデ
        </MenuItem>
        <MenuItem
          onClick={() => onMenuItemClick(CONSTANTS.VIEW_MODE.WARDROBE)}
          className="naviBar__menu"
        >
          クローゼット
        </MenuItem>
        <MenuItem
          onClick={() => onMenuItemClick(CONSTANTS.VIEW_MODE.SAVE_LOAD)}
          className="naviBar__menu"
        >
          セーブ＆ロード
        </MenuItem>
        <MenuItem
          onClick={() => onMenuItemClick(CONSTANTS.VIEW_MODE.EMMOTICON)}
          className="naviBar__menu"
        >
          顔文字
        </MenuItem>
        <MenuItem
          onClick={() => onMenuItemClick(CONSTANTS.VIEW_MODE.HELP)}
          className="naviBar__menu"
        >
          ヘルプ
        </MenuItem>
        <MenuItem
          onClick={() => onMenuItemClick(CONSTANTS.VIEW_MODE.COMMENT)}
          className="naviBar__menu"
        >
          コメント
        </MenuItem>
      </div>
    );
    return (
      <div>
        <Hidden mdUp>
          <SwipeableDrawer
            variant="temporary"
            open={open}
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
        <AppBar
          position="static"
          id="appBar"
          className="appBar"
          color="secondary"
        >
          <Toolbar>
            <IconButton
              id="menuIcon"
              color="inherit"
              aria-label="Menu"
              className="appBar__menuIcon"
              onClick={() => this.onToggle(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              {CONSTANTS.VIEW_NAME_NAME.get(viewMode)}
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
