import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

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
        holdings: this.obtainHoldings(),
        list: [],
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
        var list_and_total = this.generatePortfolioListAndTotal(json);
        this.setState(
          {
            coins: json,
            portfolio: {
              holdings: this.state.portfolio.holdings,
              list: list_and_total[0],
              total: list_and_total[1]
            }
          }
        );
      }
    );
  }

  generatePortfolioListAndTotal = (coins) => {
    //
    var list = [];
    var total = 0;

    for(var currency in this.state.portfolio.holdings) {
      var coin_hash = coins.find(
        (coin) => {
          return coin.symbol === currency;
        }
      )

      if (coin_hash) {
        var portfolio_coin_hash = {
          name: coin_hash.name,
          symbol: currency,
          amount: this.state.portfolio.holdings[currency],
          price: parseFloat(coin_hash.price_usd),
          change: coin_hash.percentage_change_1h,
          value: this.state.portfolio.holdings[currency] * coin_hash.price_usd
        }

        list.push(portfolio_coin_hash);
        total += portfolio_coin_hash.value
      }
    }

    return [
      list,
      total
    ]
  }

  examplePortfolio = () => {
    return ExamplePortfolio.data0;
  }

  componentWillMount() {
    this.fetchCoinMarketCap()
    // this.searchPortfolio()
  }

  componentDidMount() {
    setInterval(
      () => this.fetchCoinMarketCap(),
      60000 // 1 min
    )
  }

  render() {
    return (
      <Container className="portfolio">
        <Row>
          <Col>Enter a portfolio, track its value.</Col>
        </Row>
        <Row>
          <Col xs="7">
            <div className="portfolio-history">
              <PortfolioHistoryChart
                holdings={this.state.portfolio.holdings}
              />
            </div>
          </Col>
          <Col xs="5">
            <PortfolioList
              list={this.state.portfolio.list}
              holdings={this.state.portfolio.holdings}
              total={this.state.portfolio.total}
              setPortfolioHoldings={this.setPortfolioHoldings}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Portfolio;
