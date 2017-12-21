import React, { Component } from 'react';
import { Button, Input, InputGroupAddon, InputGroup, Col, Row } from 'reactstrap';

import './PortfolioListItem.css';

class PortfolioListItem extends Component {
  // name={holding.name}
  // symbol={holding.symbol}
  // amount={holding.amount}
  // price={holding.price}
  // value={holding.value}
  // percent={100 * holding.value / this.props.total}
  // editable={this.state.editable}
  // removeCurrency={this.removeCurrency}
  // updateCurrency={this.addCurrency}

  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    };
  }

  setAmount = (evt) => {
    this.setState({
      amount: (evt.target.value == '' ? '' : parseFloat(evt.target.value))
    });
  }

  updateCurrency = () => {
    if (this.state.amount == 0) {
      this.removeCurrency();
    }
    if (this.state.amount != '') {
      this.props.updateCurrency(this.props.symbol, this.state.amount);
      setTimeout(
        () => {
          this.setState(
            {
              amount: ''
            }
          )
        },
        100
      );
    }
  }

  removeCurrency = () => {
    this.props.removeCurrency(this.props.symbol);
  }

  render() {
    if (this.props.editable) {
      var portfolio_list_item =
        <Row>
          <InputGroup className="col-10 currency-input">
            <InputGroupAddon>{this.props.symbol}</InputGroupAddon>
            <Input placeholder={this.props.amount} value={this.state.amount} onChange={this.setAmount} type="number" step=".000001" />
          </InputGroup>
          <Button className="col-1" outline color="success" onClick={this.updateCurrency}>✓</Button>
          <Button className="col-1" outline color="danger" onClick={this.removeCurrency}>X</Button>
        </Row>
    }
    else {
      var portfolio_list_item =
        <Row>
          <Col xs="5">
            {this.props.name}
          </Col>
          <Col xs="3">
            {this.props.amount}
          </Col>
          <Col xs="4">
            {`$${this.props.value.toFixed(2)}`}
          </Col>
          <div className="w-100"></div>
          <Col xs="5">
            {this.props.symbol}
          </Col>
          <Col xs="3">
            {`$${this.props.price.toFixed(2)}`}
          </Col>
          <Col xs="4">
            {`${this.props.percent.toFixed(2)}%`}
          </Col>
        </Row>
    }
    return (
      <Col className="portfolio-list-item" xs="12">
        {portfolio_list_item}
      </Col>
    );
  }
}

export default PortfolioListItem;
