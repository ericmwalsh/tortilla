import React, { Component } from "react";
import Chart from "chart.js";

import Colors from "../../constants/colors";
import "./pie_chart.css";

class PieChart extends Component {
  coinDataAndLabels() {
    const coins = this.props.list.sort((a, b) => b.value - a.value);
    const colors = this.pieColors().slice(0, coins.length);
    const data = [];
    const labels = [];

    coins.forEach(coin => {
      data.push(coin.value.toFixed(2));
      labels.push(coin.symbol);
    });
    return {
      colors: colors,
      data: data,
      labels: labels,
    };
  }

  componentDidMount() {
    this.renderPie();
  }

  componentDidUpdate() {
    const coinDataAndLabels = this.coinDataAndLabels();

    document.pie.data.datasets[0].backgroundColor = coinDataAndLabels.colors;
    document.pie.data.datasets[0].data = coinDataAndLabels.data;
    document.pie.data.labels = coinDataAndLabels.labels;
    document.pie.update();
  }

  pieColors() {
    return Colors.rgba_codes.filter((element, index) => index % 3 === 0);
  }

  buildPieConfig() {
    const coinDataAndLabels = this.coinDataAndLabels();
    return {
      type: "pie",
      data: {
        datasets: [
          {
            data: coinDataAndLabels.data,
            backgroundColor: coinDataAndLabels.colors,
            label: "Portfolio",
          },
        ],
        labels: coinDataAndLabels.labels,
      },
      options: {
        responsive: true,
        tooltips: {
          custom: function(tooltipModel) {
            if (tooltipModel.body) {
              tooltipModel.body[0].lines[0] = tooltipModel.body[0].lines[0].replace(
                /: /,
                ": $",
              );
            }
            return tooltipModel;
          },
        },
      },
    };
  }

  renderPie() {
    const ctx = this.refs.PieArea.getContext("2d");
    const config = this.buildPieConfig();
    document.pie = new Chart(ctx, config);
  }

  render() {
    return (
      <div className="PortfolioPie">
        <canvas ref="PieArea" height="300" />
      </div>
    );
  }
}

export default PieChart;
