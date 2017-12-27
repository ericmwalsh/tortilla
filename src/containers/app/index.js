import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home/'
import About from '../../components/about/'

import logo from './logo.svg';
import './app.css';
import Portfolio from '../portfolio/'

class App extends Component {

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">coinucop.io</h1>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
        </header>
        <br/>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />

          <Portfolio/>
        </main>
      </div>
    )
  }

}

export default App;
