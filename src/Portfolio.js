import React, { Component } from 'react';

import PortfolioList from './PortfolioList'
import PortfolioHistoryChart from './PortfolioHistoryChart'
import PortfolioTotal from './PortfolioTotal'
import ExamplePortfolio from './constants/ExamplePortfolio'
import './Portfolio.css';

class Portfolio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      portfolio: {
        history: [],
        holdings: this.obtainHoldings(),
        total: 0
      }
    }
  }

  obtainHoldings = () => {
    var holdings = localStorage.getItem('portfolio.holdings');
    if (holdings == null) {
      holdings = this.examplePortfolio();
    }
    return holdings;
  }

  setPortfolioHoldings = (portfolio_holdings) => {
    var portfolio = {...this.state.portfolio}
    portfolio.holdings = portfolio_holdings;
    this.setState({portfolio})
    localStorage.setItem('portfolio.holdings', portfolio_holdings)
  }

  fetchCoinMarketCap = () => {
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
        body: JSON.stringify(this.state.portfolio.holdings)
      }
    )
    .then(response => response.json())
    .then(
      history => {
        var portfolio = {...this.state.portfolio};
        portfolio.history = history.data;
        this.setState({portfolio});
      }
    );
  }

  examplePortfolio = () => {
    return ExamplePortfolio.data0;
  }

  componentWillMount() {
    this.fetchCoinMarketCap()
    this.searchPortfolio()
  }

  componentDidMount() {
    setInterval(
      () => this.fetchCoinMarketCap(),
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
    let portfolio_history_chart = null;
    let portfolio_list = <PortfolioList
                          coins={this.state.coins}
                          holdings={this.state.portfolio.holdings}
                          total={this.state.portfolio.total}
                          handler={this.setPortfolioHoldings}
                        />
    if (this.state.coins != []) {
      portfolio_history_chart = <PortfolioHistoryChart
                                  history={this.state.portfolio.history}
                                />
      // portfolio_table
      // portfolio_pie
      // <PortfolioTotal coins={this.state.coins} portfolio={this.state.portfolio}/>
    }

    return (
      <div className="Portfolio">
        Enter a portfolio, track its value.
        <br/>
        <div className="portfolio-list">
          {portfolio_list}
        </div>
        <br/>
        <div className="portfolio-history">
          {portfolio_history_chart}
        </div>
        <br/>
      </div>
    );
  }
}

export default Portfolio;
