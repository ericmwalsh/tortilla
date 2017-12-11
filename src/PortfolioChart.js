import React, { Component } from 'react';
import Chart from 'chart.js'

import ChartColors from './constants/colors'
import './PortfolioChart.css';

class PortfolioChart extends Component {

  coinDataAndLabels() {
    var coins = this.props.coins.slice(0).sort((a,b) => b.total - a.total);
    var data = [];
    var labels = [];

    coins.forEach(
      (coin) => {
        data.push(coin.total.toFixed(2));
        labels.push(coin.name);
      }
    )
    return {
      data: data,
      labels: labels
    };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    var coinDataAndLabels = this.coinDataAndLabels();

    document.pie.data.datasets[0].data = coinDataAndLabels.data;
    document.pie.data.labels = coinDataAndLabels.labels;
  }

  chartColors() {
    return ChartColors.rgba_codes.filter((element, index) => index % 3 === 0);
  }

  buildChartConfig() {
    var coinDataAndLabels = this.coinDataAndLabels();
    return {
      type: 'pie',
      data: {
        datasets: [{
          data: coinDataAndLabels.data,
          backgroundColor: this.chartColors().slice(0, this.props.coins.length),
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

  renderChart() {
    var ctx = this.refs.ChartArea.getContext("2d");
    var config = this.buildChartConfig();
    document.pie = new Chart(ctx, config);
  }

  render() {
    return (
      <div className="PortfolioChart">
        <canvas className="chart-area" ref="ChartArea">
        </canvas>
      </div>
    );
  }
}

export default PortfolioChart;
