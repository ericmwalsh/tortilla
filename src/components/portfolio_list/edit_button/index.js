import React, { Component } from 'react';
import { Button, Input, Col, Row } from 'reactstrap';

import './edit_button.css';

class EditButton extends Component {
  // addHolding={this.props.addHolding}
  // editList={this.props.editList}
  // listEditable={this.props.listEditable}
  // currencySymbols={this.props.currencySymbols}

  constructor(props) {
    super(props);
    this.state = {
      addable: false,
      currency: '',
      amount: ''
    };
  }

  toggleAddable = () => {
    this.setState(
      {
        addable: !this.state.addable,
        currency: '',
        amount: ''
      }
    )
  }

  addCurrencyToPortfolio = () => {
    if (this.state.currency !== '' && this.state.amount !== '') {
      this.props.addHolding(this.state.currency, this.state.amount)
      this.toggleAddable();
    }
  }

  setAmount = (evt) => {
    this.setState({
      amount: parseFloat(evt.target.value)
    });
  }

  setCurrency = (evt) => {
    this.setState({
      currency: evt.target.value
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.addCurrencyToPortfolio();
    }
  }

  render() {
    if(this.state.addable) {
      var currency_symbols = this.props.currencySymbols.map(
        (symbol, i) => {
          return <option key={i}>{symbol}</option>;
        }
      );
      var portfolio_list_edit_button = <Row>
        <Input className="col-5" value={this.state.currency} onChange={this.setCurrency} type="select">
          {currency_symbols}
        </Input>
        <Input
          className="col-5"
          value={this.state.amount}
          onChange={this.setAmount}
          placeholder="Amount"
          type="number"
          step=".000001"
          onKeyPress={this.handleKeyPress}
        />
        <Button className="col-1" outline color="success" onClick={this.addCurrencyToPortfolio}>✓</Button>
        <Button className="col-1" outline color="danger" onClick={this.toggleAddable}>X</Button>
      </Row>
    }
    else if (this.props.listEditable) {
      portfolio_list_edit_button = <Row>
        <Button outline color="info" onClick={this.props.editList} block>Done</Button>
      </Row>
    }
    else {
      portfolio_list_edit_button = <Row>
        <Button outline className="col-6" color="success" onClick={this.toggleAddable}>Add</Button>
        <Button outline className="col-6" color="warning" onClick={this.props.editList}>Edit</Button>
      </Row>
    }
    return (
      <Col className="portfolio-list-edit-button" xs="12">
        {portfolio_list_edit_button}
      </Col>
    );
  }
}


export default EditButton;
