import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PortfolioChart from './PortfolioChart'
import PortfolioTotal from './PortfolioTotal'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      portfolio: []
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
      var portfolio = JSON.parse(event.target.value);
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">coinucop.io</h1>
        </header>
        <br/>
        <textarea rows="30" cols="100" onChange={this.handleChange} />
        <br/>
        <PortfolioTotal coins={this.state.coins} portfolio={this.state.portfolio}/>
      </div>
    );
  }
}

export default App;
