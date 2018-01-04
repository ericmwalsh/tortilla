import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import './app.css';

import withTracker from './with_tracker'

import Header from '../../components/header'

import PortfolioRedux from '../portfolio_redux'
import About from '../../components/about'
import NotFound from '../../components/not_found'


class App extends Component {

  render() {
    return(
      <div className="App">
        <Header />
        <br/>
        <main className="App-Main">
          <Route exact path="/" component={withTracker(PortfolioRedux)} />
          <Route exact path="/about" component={withTracker(About)} />
          <Route component={withTracker(NotFound)} />
        </main>
      </div>
    )
  }

}

export default App;
