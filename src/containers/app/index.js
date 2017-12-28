import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import './app.css';

import Header from '../../components/header'
import About from '../../components/about'
import Home from '../home/'
import Portfolio from '../portfolio'
import PortfolioRedux from '../portfolio_redux'
import withTracker from './with_tracker'

class App extends Component {

  render() {
    return(
      <div className="App">
        <Header />
        <br/>
        <main className="App-Main">
          <Route exact path="/" component={withTracker(Portfolio)} />
          <Route exact path="/portfolio" component={withTracker(PortfolioRedux)} />
          <Route exact path="/about" component={withTracker(About)} />
        </main>
      </div>
    )
  }

}

export default App;
