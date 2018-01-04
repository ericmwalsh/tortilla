import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PortfolioList from '../../components/portfolio_list'
import HistoryChart from '../../components/history_chart'
import PieChart from '../../components/pie_chart'
import SortableTable from '../../components/sortable_table'
import './portfolio.css';

class Portfolio extends Component {

  componentWillMount() {
    this.props.ccpRefresh()
    this.props.cmcRefresh()
  }

  componentDidMount() {
    setInterval(
      () => this.props.cmcRefresh(),
      60000 // 1 min
    )
    setInterval(
      () => this.props.ccpRefresh(),
      3600000 // 1 hr
    )
  }

  render() {
    return (
      <Container className="portfolio">
        <Row>
          <Col>Enter a portfolio, track its value.</Col>
        </Row>
        <Row>
          <Col xs="12" lg="5" className="order-lg-2">
            <PortfolioList
              currencySymbols={this.props.currencySymbols}
              holdings={this.props.holdings}
              list={this.props.list}
              listEditable={this.props.listEditable}
              total={this.props.total}
              addHolding={this.props.addHolding}
              removeHolding={this.props.removeHolding}
              modifyHolding={this.props.modifyHolding}
              editList={this.props.editList}
            />
          </Col>
          <Col xs="12" lg="7">
            <div className="portfolio-pie">
              <PieChart
                list={this.props.list}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <SortableTable
            list={this.props.list}
          />
        </Row>
        <Row>
          <div className="portfolio-history">
            <HistoryChart
              history={this.props.history}
              holdings={this.props.holdings}
            />
          </div>
        </Row>
      </Container>
    );
  }
}

export default Portfolio;
