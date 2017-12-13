import React, { Component } from 'react';
import Chart from 'chart.js'

import Colors from './constants/colors'
// import './PortfolioHistoryChart.css';

class PortfolioHistoryChart extends Component {

  componentDidMount() {
    if (this.props.history != []) {
      this.renderPie();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.history) === JSON.stringify(nextProps.history)) {
      return false;
    }
    return true
  }

  componentDidUpdate() {
    var formattedHistory = {
      x: [],
      y: []
    };
    this.props.history.forEach(
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
    this.props.history.forEach(
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
