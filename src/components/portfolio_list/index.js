import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Item from './item'
import EditButton from './edit_button'
import './portfolio_list.css';

class PortfolioList extends Component {
  // list={this.state.portfolio.list}
  // holdings={this.state.portfolio.holdings}
  // total={this.state.portfolio.total}
  // setPortfolioHoldings={this.setPortfolioHoldings}
  // currencySymbols={this.state.portfolio.currencySymbols}

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

  addCurrency = (currency, amount) => {
    var new_holdings = this.props.holdings
    new_holdings.push([currency, amount]);
    this.props.setPortfolioHoldings(new_holdings);
  }

  updateCurrency = (currency, amount) => {
    var new_holdings = this.props.holdings.filter(holding => holding[0] != currency);
    new_holdings.push([currency, amount]);
    this.props.setPortfolioHoldings(new_holdings);
  }

  removeCurrency = (currency) => {
    var new_holdings = this.props.holdings.filter(holding => holding[0] != currency);
    this.props.setPortfolioHoldings(new_holdings);
  }

  renderPortfolio = () => {
    return this.props.list.sort((a,b) => a.order - b.order).map(
      (holding, i) => {
        return <Item
                name={holding.name}
                symbol={holding.symbol}
                amount={holding.amount}
                price={holding.price}
                value={holding.value}
                percent={100 * holding.value / this.props.total}
                editable={this.state.editable}
                removeCurrency={this.removeCurrency}
                updateCurrency={this.updateCurrency}
                key={i}
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
          <Row className='portfolio-holdings'>
            {portfolio_holdings}
          </Row>
          <Row>
            <EditButton
              addCurrency={this.addCurrency}
              toggleEditable={this.toggleEditable}
              editable={this.state.editable}
              currencySymbols={this.props.currencySymbols}
            />
          </Row>
        </div>
      );
    }
  }
}

export default PortfolioList;
