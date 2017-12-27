import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import './app.css';

import Header from '../../components/header'
import About from '../../components/about'
import Home from '../home/'
import Portfolio from '../portfolio'

class App extends Component {

  render() {
    return(
      <div className="App">
        <Header />
        <br/>
        <main>
          <Route exact path="/" component={Portfolio} />
          <Route exact path="/about" component={About} />
        </main>
      </div>
    )
  }

}

export default App;
