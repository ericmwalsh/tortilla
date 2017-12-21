import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PortfolioList from './PortfolioList'
import PortfolioHistoryChart from './PortfolioHistoryChart'
import PortfolioPie from './PortfolioPie'
import PortfolioTable from './PortfolioTable'
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
    var holdings = JSON.parse(localStorage.getItem('portfolio.holdings'));
    if (holdings == null) {
      holdings = this.examplePortfolio();
    }
    return holdings;
  }

  setPortfolioHoldings = (portfolio_holdings) => {
    var portfolio = {...this.state.portfolio}
    var list_and_total = this.generatePortfolioListAndTotal(this.state.coins, portfolio_holdings);

    if (JSON.stringify(this.state.portfolio.list) != JSON.stringify(list_and_total[0])) {
      portfolio.holdings = portfolio_holdings;
      portfolio.list = list_and_total[0]
      portfolio.total = list_and_total[1]

      this.setState({portfolio})
      localStorage.setItem('portfolio.holdings', JSON.stringify(portfolio_holdings))
    }
  }

  fetchCoinMarketCap = () => {
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=0')
    .then(response => response.json())
    .then(
      json => {
        if (JSON.stringify(json) != JSON.stringify(this.state.coins)) {
          var list_and_total = this.generatePortfolioListAndTotal(json, this.state.portfolio.holdings);
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
      }
    );
  }

  generatePortfolioListAndTotal = (coins, holdings) => {
    //
    var list = [];
    var total = 0;

    for(var currency in holdings) {
      var coin_hash = coins.find(
        (coin) => {
          return coin.symbol === currency;
        }
      )

      if (coin_hash) {
        var portfolio_coin_hash = {
          name: coin_hash.name,
          symbol: currency,
          amount: holdings[currency],
          price: parseFloat(coin_hash.price_usd),
          change_h: parseFloat(coin_hash.percent_change_1h),
          change_d: parseFloat(coin_hash.percent_change_24h),
          change_w: parseFloat(coin_hash.percent_change_7d),
          value: holdings[currency] * parseFloat(coin_hash.price_usd)
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
  }

  componentDidMount() {
    setInterval(
      () => this.fetchCoinMarketCap(),
      60000 // 1 min
    )
  }

  componentDidUpdate() {
    // this.fetchCoinMarketCap();
  }

  render() {
    return (
      <Container className="portfolio">
        <Row>
          <Col>Enter a portfolio, track its value.</Col>
        </Row>
        <Row>
          <Col xs="7">
            <div className="portfolio-pie">
              <PortfolioPie
                list={this.state.portfolio.list}
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
        <Row>
          <PortfolioTable
            list={this.state.portfolio.list}
          />
        </Row>
        <Row>
          <div className="portfolio-history">
            <PortfolioHistoryChart
              holdings={this.state.portfolio.holdings}
            />
          </div>
        </Row>
      </Container>
    );
  }
}

export default Portfolio;
