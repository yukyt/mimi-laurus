import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, MenuItem, Drawer } from 'material-ui';
import { clickMenuItem } from '../actions/menu';

class NaviBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  onToggle() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={() => this.onToggle()}
          >
            <AppBar title="Menu" />
            <MenuItem onClick={() => this.props.onMenuItemClick(1)}>推奨コーデ</MenuItem>
            <MenuItem onClick={() => this.props.onMenuItemClick(2)}>ワードローブ</MenuItem>
            <MenuItem onClick={() => this.props.onMenuItemClick(3)}>ヘルプ</MenuItem>
          </Drawer>
          <AppBar
            title="シミュレータ"
            onLeftIconButtonClick={() => this.onToggle()}
          />
        </div>
      </MuiThemeProvider>
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
