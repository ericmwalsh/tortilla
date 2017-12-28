import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Item from './item'
import EditButton from './edit_button'
import './portfolio_list.css';

class PortfolioListRedux extends Component {
  // currencySymbols={this.props.currencySymbols}
  // holdings={this.props.holdings}
  // list={this.props.list}
  // listEditable={this.props.listEditable}
  // total={this.props.total}
  // addHolding={this.props.addHolding}
  // removeHolding={this.props.removeHolding}
  // modifyHolding={this.props.modifyHolding}
  // editList={this.props.editList}

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
                editable={this.props.listEditable}
                removeHolding={this.props.removeHolding}
                modifyHolding={this.props.modifyHolding}
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
              addHolding={this.props.addHolding}
              editList={this.props.editList}
              listEditable={this.props.listEditable}
              currencySymbols={this.props.currencySymbols}
            />
          </Row>
        </div>
      );
    }
  }
}

export default PortfolioListRedux;
