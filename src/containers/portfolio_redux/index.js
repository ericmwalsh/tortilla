import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PortfolioListRedux from '../../components/portfolio_list_redux'
import HistoryChart from '../../components/history_chart'
import PieChart from '../../components/pie_chart'
import SortableTable from '../../components/sortable_table'
import './portfolio_redux.css';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  ccpRefresh,
  cmcRefresh,
  addHolding,
  removeHolding,
  modifyHolding,
  editList
} from '../../actions/portfolio'



class PortfolioRedux extends Component {

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
          <Col xs="12" sm="5" className="order-sm-2">
            <PortfolioListRedux
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
          <Col xs="12" sm="7">
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

const mapStateToProps = state => ({
  currencySymbols: state.portfolio.currencySymbols,
  history: state.portfolio.history,
  holdings: state.portfolio.holdings,
  list: state.portfolio.list,
  listEditable: state.portfolio.listEditable,
  total: state.portfolio.total
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ccpRefresh,
  cmcRefresh,
  addHolding,
  removeHolding,
  modifyHolding,
  editList
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioRedux);
