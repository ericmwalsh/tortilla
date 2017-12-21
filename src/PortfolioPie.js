import React, { Component } from 'react';
import Chart from 'chart.js'

import Colors from './constants/colors'
import './PortfolioPie.css';

class PortfolioPie extends Component {

  coinDataAndLabels() {
    var coins = this.props.list.sort((a,b) => b.value - a.value);
    var colors = this.pieColors().slice(0, coins.length);
    var data = [];
    var labels = [];

    coins.forEach(
      (coin) => {
        data.push(coin.value.toFixed(2));
        labels.push(coin.symbol);
      }
    )
    return {
      colors: colors,
      data: data,
      labels: labels
    };
  }

  componentDidMount() {
    this.renderPie();
  }

  componentDidUpdate() {
    var coinDataAndLabels = this.coinDataAndLabels();

    document.pie.data.datasets[0].backgroundColor = coinDataAndLabels.colors;
    document.pie.data.datasets[0].data = coinDataAndLabels.data;
    document.pie.data.labels = coinDataAndLabels.labels;
    document.pie.update();
  }

  pieColors() {
    return Colors.rgba_codes.filter((element, index) => index % 3 === 0);
  }

  buildPieConfig() {
    var coinDataAndLabels = this.coinDataAndLabels();
    return {
      type: 'pie',
      data: {
        datasets: [{
          data: coinDataAndLabels.data,
          backgroundColor: coinDataAndLabels.colors,
          label: 'Portfolio'
        }],
        labels: coinDataAndLabels.labels
      },
      options: {
        responsive: true,
        tooltips: {
          custom: function(tooltipModel) {
            if (tooltipModel.body) {
              tooltipModel.body[0].lines[0] = tooltipModel.body[0].lines[0].replace(/: /, ": $");
            }
            return tooltipModel;
          }
        }
      }
    }
  }

  renderPie() {
    var ctx = this.refs.PieArea.getContext("2d");
    var config = this.buildPieConfig();
    document.pie = new Chart(ctx, config);
  }

  render() {
    return (
      <div className="PortfolioPie">
        <canvas ref="PieArea" height="300">
        </canvas>
      </div>
    );
  }
}

export default PortfolioPie;
