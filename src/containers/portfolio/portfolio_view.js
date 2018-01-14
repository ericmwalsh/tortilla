import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import PortfolioList from '../../components/portfolio_list'
import HistoryChart from '../../components/history_chart'
import PieChart from '../../components/pie_chart'
import SortableTable from '../../components/sortable_table'
import './portfolio.css';

import AuthService from '../../utils/auth_service'

class Portfolio extends Component {

  componentWillMount() {
    this.props.ccpRefresh()
    this.props.cmcRefresh()
    if (AuthService.loggedIn()) {
      var headers = {
        'Authorization': `Bearer ${AuthService.getAccessToken()}`,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }

      fetch(`${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}portfolio`, {headers})
      .then(response => response.json())
      .then(
        json => {
          var holdings = localStorage.getItem('portfolio.holdings');
          // new account
          if (json.data === "") {
            if (holdings) {
              fetch(
                `${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}portfolio`,
                {
                  headers,
                  method: "POST",
                  body: JSON.stringify({holdings: holdings})
                }
              )
            }
          }
          // load stored holdings
          else {
            if (json.data !== holdings) {
              localStorage.setItem('portfolio.holdings', json.data)
              return this.props.refresh();
            }
          }
        }
      );
    }
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
          <Col>
            <p>NOTE: COINUCOP.IO is in the process of moving to CHALUPA.IO</p>
            <p>This process <em>should</em> be completed by 1/16 - cheers!</p>
            <br />
            <p>Enter a portfolio, track its value.</p>
            {this.props.auth.isAuthenticated &&
              <p>*Changes to your portfolio (while logged in) will be saved to your account.</p>
            }
          </Col>
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
