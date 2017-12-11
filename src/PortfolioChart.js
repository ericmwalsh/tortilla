import React, { Component } from 'react';
import Chart from 'chart.js'

import ChartColors from './constants/colors'

class PortfolioChart extends Component {

  randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
  };

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    var data = [];
    this.props.coins.forEach(
      (coin) => {
        data.push(coin.total.toFixed(2));
      }
    )
    document.pie.data.datasets[0].data = data;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
      return false;
    }
    return true
  }

  buildChartConfig() {
    var data = [];
    var labels = [];

    this.props.coins.forEach(
      (coin) => {
        data.push(coin.total.toFixed(2));
        labels.push(coin.name);
      }
    )
    return {
      type: 'pie',
      data: {
        datasets: [{
          data: data,
          backgroundColor: ChartColors.rgba_codes.slice(0, this.props.coins.length),
          label: 'Portfolio'
        }],
        labels: labels
      },
      options: {
        responsive: true
      }
    }
  }

  renderChart() {
    var ctx = this.refs.ChartArea.getContext("2d");
    var config = this.buildChartConfig();
    document.pie = new Chart(ctx, config);
  }

  render() {
    return (
      <div className="PortfolioChart">
        <canvas id="chart-area" ref="ChartArea">
        </canvas>
      </div>
    );
  }
}

export default PortfolioChart;
