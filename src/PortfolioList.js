import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import PortfolioListItem from './PortfolioListItem'
import PortfolioListEditButton from './PortfolioListEditButton'
import './PortfolioList.css';

class PortfolioList extends Component {
  // list={this.state.portfolio.list}
  // holdings={this.state.portfolio.holdings}
  // total={this.state.portfolio.total}
  // setPortfolioHoldings={this.setPortfolioHoldings}

  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
  }


  toggleEditable = () => {
    this.setState(
      {
        editable: !this.state.editable
      }
    )
  }

  addCurrency = () => {
    //
  }

  renderPortfolio = () => {
    return this.props.list.map(
      (holding) => {
        return <PortfolioListItem
                name={holding.name}
                symbol={holding.symbol}
                amount={holding.amount}
                price={holding.price}
                value={holding.value}
                percent={100 * holding.value / this.props.total}
                editable={this.state.editable}
                removeCurrency={1}
              />;
      }
    );
  }

  render() {
    var portfolio_holdings = this.renderPortfolio();

    if (this.props.total == 0) {
      return (
        <div className="portfolio-list">
          <Row className='portfolio-total'>
            <Col>
              $--
            </Col>
          </Row>
        </div>
      );
    }
    else {
      var portfolio_total = `$${this.props.total.toFixed(2)}`;
      return (
        <div className="portfolio-list">
          <Row className='portfolio-total'>
            <Col>
              {portfolio_total}
            </Col>
          </Row>
          <Row>
            {portfolio_holdings}
          </Row>
          <Row>
            <PortfolioListEditButton
              addCurrency={this.addCurrency}
              toggleEditable={this.toggleEditable}
              editable={this.state.editable}
            />
          </Row>
        </div>
      );
    }
  }
}

export default PortfolioList;
