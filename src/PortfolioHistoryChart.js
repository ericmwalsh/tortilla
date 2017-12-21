import React, { Component } from 'react';
import Chart from 'chart.js'

import Colors from './constants/colors'
import './PortfolioHistoryChart.css';

class PortfolioHistoryChart extends Component {

  // holdings={this.state.portfolio.holdings}

  componentDidMount() {
    this.renderHistoryChart();
  }

  searchPortfolio = () => {
    var formatted_holdings = {};
    this.props.holdings.forEach(
      (holding) => {
        formatted_holdings[holding[0]] = holding[1];
      }
    )

    fetch('https://ror-crypto-portfolio.herokuapp.com/calculate_month',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formatted_holdings)
      }
    )
    .then(response => response.json())
    .then(
      history => {
        var formattedHistory = {
          x: [],
          y: []
        };
        history.data.forEach(
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
    );
  }

  componentDidUpdate() {
    this.searchPortfolio()
  }

  buildHistoryChartConfig() {
    return {
      type: 'line',
      data: {
        labels: [],
        dataSets: [
          {
            label: 'Value (USD)',
            data: []
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
