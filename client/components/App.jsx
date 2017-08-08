import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { tealA400 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import Scene from './Scene.jsx';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: tealA400,
  },
});

export default class App extends Component {

  constructor (props) {
    super(props);
    // this.state = { name: 'John' };
    // this.onTap = this.onTap.bind(this);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <AppBar title="Digital Image Processing" />
          <Scene />
        </div>
      </MuiThemeProvider>
    )
  }
}
