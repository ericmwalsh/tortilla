import React, { Component } from 'react';
import Chart from 'chart.js'

import Colors from './constants/colors'
// import './PortfolioHistoryChart.css';

class PortfolioHistoryChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }

  componentDidMount() {
    if (this.state.history != []) {
      this.renderPie();
    }
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

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state.history) === JSON.stringify(nextProps.history)) {
      return false;
    }
    return true
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

  pieColors() {
    return Colors.rgba_codes.filter((element, index) => index % 3 === 0);
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
        responsive: true
      }
    }
  }

  renderPie() {
    var ctx = this.refs.HistoryChartArea.getContext("2d");
    var config = this.buildHistoryChartConfig();
    document.historyChart = new Chart(ctx, config);
  }

  render() {
    return (
      <div className="PortfolioHistoryChart">
        <canvas ref="HistoryChartArea">
        </canvas>
      </div>
    );
  }
}

export default PortfolioHistoryChart;
