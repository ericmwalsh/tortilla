import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';


import PortfolioTotal from './PortfolioTotal'
import ExamplePortfolio from './constants/ExamplePortfolio'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      portfolio: JSON.parse(this.examplePortfolio())
    }
  }

  search = () => {
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=0')
    .then(response => response.json())
    .then(
      json => {
        this.setState(
          {
            coins: json
          }
        );
      }
    );
  }

  examplePortfolio = () => {
    return ExamplePortfolio.data;
  }

  componentWillMount() {
    this.search()
  }

  componentDidMount() {
    setInterval(
      () => this.search(),
      60000 // 1 min
    )
  }

  handleChange = (event) => {
    try {
      var portfolio = JSON.parse(
        event.target.value.replace(/[\u2018\u2019]/g, '"').replace(/[\u201C\u201D]/g, '"')
      );
    } catch (e) {
      var portfolio = []
    }
    this.setState(
      {
        portfolio: portfolio
      }
    )
  }

  render() {
    const examplePortfolio = this.examplePortfolio();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">coinucop.io</h1>
        </header>
        <br/>
        Enter a profile, track its value.
        <br/>
        <textarea rows="30" cols="70" onChange={this.handleChange} defaultValue={this.examplePortfolio()} />
        <br/>
        <PortfolioTotal coins={this.state.coins} portfolio={this.state.portfolio}/>
      </div>
    );
  }
}

export default App;
