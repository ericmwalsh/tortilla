import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button } from 'reactstrap';
import { Link } from 'react-router-dom'

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

  introContainer() {
    return (
      <Container className="intro-container">
        <Row>
          <Col>
            <Jumbotron>
              <h3 className="display-5">Cryptocurrency Portfolio Management</h3>
              <p className="lead">
                <b>chalupa.io</b> is a tool to help you track your portfolio, share your gains, and reap the rewards.
              </p>
              <hr className="my-2" />
              <p>We are currently in beta but are adding new features on a regular basis.</p>
              <p>The current <em>optimistic</em> goal is to add FREE tax calculations before the end of the 2017 tax season.</p>
              <p className="lead">
                <Button tag={Link} to="/features" color="primary">Learn More</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }

  portfolioContainer() {
    return (
      <Container className="portfolio-container">
        <Row>
          <Col>
            <div className="intro-text">
              <p>Enter a portfolio, track its value.</p>
              {this.props.auth.isAuthenticated ?
                <p>*Changes to your portfolio (while logged in) will be saved to your account.</p>
                :
                <p>*Sign up to save your portfolio and get access to more advanced tools and analytics!</p>
              }
            </div>
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

  render() {
    return (
      <div className="portfolio">
        {!this.props.auth.isAuthenticated && this.introContainer()}
        {this.portfolioContainer()}
      </div>
    );
  }
}

export default Portfolio;
