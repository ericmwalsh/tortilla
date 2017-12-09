import React, { Component } from 'react';

import PortfolioChart from './PortfolioChart'

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
        var coin_total = parseFloat(api_coin_hash["price_usd"]) * coin_quantity
        total_hash.total += coin_total
        total_hash.coins.push(
          {
            name: coin_symbol,
            quantity: coin_quantity,
            total: coin_total
          }
        )
      }
    }
    return total_hash;
  }

  render() {
    var total_hash = this.calculatePortfolioValue()

    let chart = null;
    if (total_hash.total > 0) {
      chart = <PortfolioChart total={total_hash.total} coins={total_hash.coins} />;
    }

    return (
      <div className="PortfolioValue">
        ${total_hash.total.toFixed(2)}
        <br/>
        {chart}
      </div>
    );
  }
}

export default PortfolioTotal;
