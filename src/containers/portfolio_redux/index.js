import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PortfolioList from '../../components/portfolio_list'
import HistoryChart from '../../components/history_chart'
import PieChart from '../../components/pie_chart'
import SortableTable from '../../components/sortable_table'
import './portfolio_redux.css';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  cmcRefresh,
  addHolding,
  removeHolding,
  modifyHolding,
  editList
} from '../../actions/portfolio'



import PortfolioListRedux from '../../components/portfolio_list_redux'



class PortfolioRedux extends Component {

  componentWillMount() {
    this.props.cmcRefresh()
  }

  componentDidMount() {
    setInterval(
      () => this.props.cmcRefresh(),
      60000 // 1 min
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
              holdings={this.props.holdings}
              list={this.props.list}
              list_editable={this.props.list_editable}
              total={this.props.total}
              addHolding={this.props.addHolding}
              removeHolding={this.props.removeHolding}
              modifyHolding={this.props.modifyHolding}
              editList={this.props.editList}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

// <Col xs="12" sm="7">
//   <div className="portfolio-pie">
//     <PieChart
//       list={this.state.portfolio.list}
//     />
//   </div>
// </Col>


// <Row>
//   <SortableTable
//     list={this.state.portfolio.list}
//   />
// </Row>
// <Row>
//   <div className="portfolio-history">
//     <HistoryChart
//       holdings={this.state.portfolio.holdings}
//     />
//   </div>
// </Row>

const mapStateToProps = state => ({
  holdings: state.portfolio.holdings,
  list: state.portfolio.list,
  list_editable: state.portfolio.list_editable,
  total: state.portfolio.total
})

const mapDispatchToProps = dispatch => bindActionCreators({
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
