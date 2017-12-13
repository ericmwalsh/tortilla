import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Portfolio from './Portfolio'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">coinucop.io</h1>
        </header>
        <br/>
        <Portfolio/>
      </div>
    );
  }
}

export default App;
