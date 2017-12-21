import React, { Component } from 'react';
import Chart from 'chart.js'

import Colors from './constants/colors'
import './PortfolioHistoryChart.css';

class PortfolioHistoryChart extends Component {

  // holdings={this.state.portfolio.holdings}
  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }

  componentDidMount() {
    this.renderHistoryChart();
  }

  // componentDidUpdate() {
  //   var coinDataAndLabels = this.coinDataAndLabels();

  //   document.pie.data.datasets[0].backgroundColor = coinDataAndLabels.colors;
  //   document.pie.data.datasets[0].data = coinDataAndLabels.data;
  //   document.pie.data.labels = coinDataAndLabels.labels;
  //   document.pie.update();
  // }

  searchPortfolio = () => {
    fetch('https://ror-crypto-portfolio.herokuapp.com/calculate_month',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.holdings)
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

  componentDidUpdate() {
    var formattedHistory = {
      x: [],
      y: []
    };
    this.state.history.forEach(
      (prop) => {
        formattedHistory.x.push((new Date(parseFloat(`${prop[0]}000`))).toLocaleDateString("en-US"));
        formattedHistory.y.push(prop[1]);
      }
    )

    document.historyChart.data = {
      labels: formattedHistory.x,
      datasets: [
        {
          label: 'Value (USD)',
          backgroundColor: ["rgba(85,107,47,1)"],
          data: formattedHistory.y
        }
      ]
    };
    document.historyChart.update();
  }

  buildHistoryChartConfig() {
    var formattedHistory = {
      x: [],
      y: []
    };
    this.state.history.forEach(
      (prop) => {
        formattedHistory.x.push((new Date(parseFloat(`${prop[0]}000`))).toLocaleDateString("en-US"));
        formattedHistory.y.push(prop[1]);
      }
    )
    return {
      type: 'line',
      data: {
        labels: formattedHistory.x,
        dataSets: [
          {
            label: 'Value (USD)',
            data: formattedHistory.y
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }

  renderHistoryChart() {
    var ctx = this.refs.HistoryChartArea.getContext("2d");
    var config = this.buildHistoryChartConfig();
    document.historyChart = new Chart(ctx, config);
  }

  componentWillMount() {
    this.searchPortfolio()
  }

  render() {
    return (
      <div className="PortfolioHistoryChart">
        <canvas ref="HistoryChartArea" height="400px">
        </canvas>
      </div>
    );
  }
}

export default PortfolioHistoryChart;
