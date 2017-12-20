import React, { Component } from 'react';
import { Button, Input, InputGroupAddon, InputGroup, Col, Row } from 'reactstrap';

import './PortfolioListItem.css';

class PortfolioListItem extends Component {

  render() {
    if (this.props.editable) {
      var portfolio_list_item =
        <Row>
          <InputGroup className="col-10 currency-input">
            <InputGroupAddon>{this.props.symbol}</InputGroupAddon>
            <Input placeholder={this.props.amount} />
          </InputGroup>
          <Button className="col-1" outline color="success" onClick={1}>✓</Button>
          <Button className="col-1" outline color="danger">X</Button>
        </Row>
    }
    else {
      var portfolio_list_item =
        <Row>
          <Col>
            {this.props.name}
          </Col>
          <Col>
            {this.props.amount}
          </Col>
          <Col>
            {`$${this.props.value.toFixed(2)}`}
          </Col>
          <div className="w-100"></div>
          <Col>
            {this.props.symbol}
          </Col>
          <Col>
            {`$${this.props.price.toFixed(2)}`}
          </Col>
          <Col>
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
