import React, { Component } from 'react';
import Chart from 'chart.js'

class PortfolioChart extends Component {

  randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
  };

  componentDidMount() {
    var ctx = this.refs.ChartArea.getContext("2d");
    var config = {
      type: 'pie',
      data: {
        datasets: [{
          data: [
            this.randomScalingFactor(),
            this.randomScalingFactor()
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          label: 'Dataset 1'
        }],
        labels: [
          "Red",
          "Blue"
        ]
      },
      options: {
        responsive: true
      }
    };
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
