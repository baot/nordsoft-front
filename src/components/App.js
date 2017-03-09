import React, { Component } from 'react';

import Participant from './participant/Participant';
import Notification from './notification/Notification';

import 'font-awesome/css/font-awesome.css';
import logo from '../logo.svg';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App-container">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App">
          <h2>List of participants</h2>
          <Participant className="table"/>
          <Notification />
        </div>
      </div>
    );
  }
}

export default App;
