import React, { Component } from "react";
import Chart from "chart.js";

// import Colors from '../../constants/colors'
import "./history_chart.css";

class HistoryChart extends Component {
  // history={this.props.history}
  // holdings={this.props.holdings}

  componentDidMount() {
    this.renderHistoryChart();
  }

  updatePortfolio = () => {
    const time_and_totals = {};

    this.props.holdings.forEach(function(holding) {
      // currency, amount
      // [ "BTC", 0.04307861 ]
      if (this.props.history[`${holding[0]}`]) {
        this.props.history[`${holding[0]}`].forEach(holdingSnapshot => {
          // value, time
          // [ 20689.26, 1512000000 ]
          if (time_and_totals[holdingSnapshot[1]]) {
            time_and_totals[holdingSnapshot[1]] +=
              holdingSnapshot[0] * holding[1];
          } else {
            time_and_totals[holdingSnapshot[1]] =
              holdingSnapshot[0] * holding[1];
          }
        });
      }
    }, this);

    const formattedHistory = {
      x: [],
      y: [],
    };

    Object.keys(time_and_totals)
      .sort()
      .forEach(time => {
        formattedHistory.x.push(
          new Date(parseFloat(`${time}000`)).toLocaleDateString("en-US"),
        );
        formattedHistory.y.push(time_and_totals[time]);
      });

    document.historyChart.data = {
      labels: formattedHistory.x,
      datasets: [
        {
          label: "Value (USD)",
          backgroundColor: ["rgba(85,107,47,1)"],
          data: formattedHistory.y,
        },
      ],
    };
    document.historyChart.update();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.holdings.length > 0 &&
      Object.keys(this.props.history).length !== 0
    ) {
      this.updatePortfolio();
    }
  }

  buildHistoryChartConfig() {
    return {
      type: "line",
      data: {
        labels: [],
        dataSets: [
          {
            label: "Value (USD)",
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  }

  renderHistoryChart() {
    const ctx = this.refs.HistoryChartArea.getContext("2d");
    const config = this.buildHistoryChartConfig();
    document.historyChart = new Chart(ctx, config);
  }

  render() {
    return (
      <div className="PortfolioHistoryChart">
        <canvas ref="HistoryChartArea" height="400px" />
      </div>
    );
  }
}

export default HistoryChart;
