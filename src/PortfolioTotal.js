import React, { Component } from 'react';

import PortfolioChart from './PortfolioChart'
import PortfolioTable from './PortfolioTable'
import './Portfolio.css';

class PortfolioTotal extends Component {

  calculatePortfolioValue = () => {
    var total_hash = {
      coins: [],
      total: 0
    };
    for(var coin_symbol in this.props.portfolio){
      // coin_symbol
      var coin_quantity = parseFloat(this.props.portfolio[coin_symbol]);

      var api_coin_hash = this.props.coins.find(
        (coin) => {
          return coin.symbol == coin_symbol
        }
      )
      if(api_coin_hash){
        var coin_value = parseFloat(api_coin_hash["price_usd"]);
        var coin_total = coin_value * coin_quantity
        total_hash.total += coin_total
        total_hash.coins.push(
          {
            name: coin_symbol,
            quantity: coin_quantity,
            total: coin_total,
            value: coin_value
          }
        )
      }
    }
    return total_hash;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
      return false;
    }
    return true
  }

  render() {
    var total_hash = this.calculatePortfolioValue()

    let chart = null;
    let table = null;
    if (total_hash.total > 0) {
      chart = <PortfolioChart total={total_hash.total} coins={total_hash.coins} />;
      table = <PortfolioTable total={total_hash.total} coins={total_hash.coins} />;
    }

    return (
      <div className="PortfolioValue">
        <div className="portfolio-total">
          ${total_hash.total.toFixed(2)}
        </div>
        <div className="portfolio-table">
          {table}
        </div>
        <div className="portfolio-chart">
          {chart}
        </div>
        * Supports up to 40 currencies at this time.
      </div>
    );
  }
}

export default PortfolioTotal;
