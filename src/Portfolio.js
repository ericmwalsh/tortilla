import React, { Component } from 'react';

import PortfolioHistoryChart from './PortfolioHistoryChart'
import PortfolioTotal from './PortfolioTotal'
import ExamplePortfolio from './constants/ExamplePortfolio'
import './Portfolio.css';

class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      history: [],
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

  searchPortfolio = () => {
    fetch('https://ror-crypto-portfolio.herokuapp.com/calculate_month',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.portfolio)
      }
    )
    .then(response => response.json())
    .then(
      history => {
        this.setState(
          {
            history: history.data
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
    this.searchPortfolio()
  }

  componentDidMount() {
    setInterval(
      () => this.search(),
      60000 // 1 min
    )
  }

  handleChange = (event) => {
    try {
      var text_value = event.target.value.replace(/[\u2018\u2019]/g, '"').replace(/[\u201C\u201D]/g, '"');
      var portfolio = JSON.parse(text_value);

      fetch('https://ror-crypto-portfolio.herokuapp.com/calculate_month',
        {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(portfolio)
        }
      )
      .then(response => response.json())
      .then(
        history => {
          this.setState(
            {
              portfolio: portfolio,
              history: history.data
            }
          );
        }
      );

    } catch (e) {
      var portfolio = [];
      var history = [];

      this.setState(
        {
          portfolio: portfolio,
          history: history
        }
      )
    }
  }

  render() {
    const examplePortfolio = this.examplePortfolio();

    let history_chart = null;
    if (this.state.history != []) {
      history_chart = <PortfolioHistoryChart coins={this.state.coins} portfolio={this.state.portfolio} history={this.state.history}/>
    }

    return (
      <div className="Portfolio">
        Enter a profile, track its value.
        <br/>
        <div className="portfolio-entry">
          <textarea rows="35" cols="100" onChange={this.handleChange} defaultValue={this.examplePortfolio()} />
        </div>
        <div className="portfolio-history">
          {history_chart}
        </div>
        <br/>
        <PortfolioTotal coins={this.state.coins} portfolio={this.state.portfolio}/>
      </div>
    );
  }
}

export default Portfolio;
