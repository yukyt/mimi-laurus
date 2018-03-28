import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, MenuItem, Drawer } from 'material-ui';

class NaviBar extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }
  onToggle() {
    this.setState({
      open: !this.state.open
    })
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
            <MenuItem>推奨コーデ(mock)</MenuItem>
            <MenuItem>ワードローブ(mock)</MenuItem>
            <MenuItem>ヘルプ(mock)</MenuItem>
          </Drawer>
          <AppBar
            title="シミュレータ"
            onLeftIconButtonClick={ () => this.onToggle()}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default NaviBar;
