import React, { Component } from 'react';
import { Button, Input, Col, Form, Row } from 'reactstrap';

import './PortfolioListEditButton.css';

class PortfolioListEditButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addable: false
    };
  }

  toggleAddable = () => {
    this.setState(
      {
        addable: !this.state.addable
      }
    )
  }

  render() {
    if(this.state.addable) {
      var portfolio_list_edit_button = <Row>
        <Input className="col-5" placeholder="Coin" />
        <Input className="col-5" placeholder="Amount" type="number" step=".000001" />
        <Button className="col-1" outline color="success" onClick={1}>✓</Button>
        <Button className="col-1" outline color="danger" onClick={this.toggleAddable}>X</Button>
      </Row>
    }
    else if (this.props.editable) {
      var portfolio_list_edit_button = <Row>
        <Button outline color="info" onClick={this.props.toggleEditable} block>Done</Button>
      </Row>
    }
    else {
      var portfolio_list_edit_button = <Row>
        <Button outline className="col-6" color="success" onClick={this.toggleAddable}>Add</Button>
        <Button outline className="col-6" color="warning" onClick={this.props.toggleEditable}>Edit</Button>
      </Row>
    }
    return (
      <Col className="portfolio-list-edit-button" xs="12">
        {portfolio_list_edit_button}
      </Col>
    );
  }
}

// <Col>
// </Col>
// <Col>
// </Col>

export default PortfolioListEditButton;
