import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  Button,
  Jumbotron } from 'reactstrap';
import PropTypes from 'prop-types';

import './features.css';
import card1 from './card-1.jpeg'
import card2 from './card-2.jpeg'
import card3 from './card-3.jpeg'
import card4 from './card-4.jpeg'


class Features extends Component {
  render() {
    return(
      <div className="features">
        <h1>Features</h1>
        <br />
        <br />
        <Container>
          <Row>
            <Col xs="12" lg="6">
              <Card>
                <CardImg top width="100%" src={card1} alt="portfolio tracking card image" />
                <CardBody>
                  <CardTitle>
                    Portfolio Tracking
                  </CardTitle>
                  <CardSubtitle>
                    Managing your crypto holdings should be simple
                  </CardSubtitle>
                  <CardText>
                    chalupa.io allows you to track the performance of your holdings across your entire portfolio.
                    You have the power to input your portfolio manually, via CSV*, via exchange API keys*, and via wallet addresses*.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" lg="6">
              <Card>
                <CardImg top width="100%" src={card2} alt="dependability and security card image" />
                <CardBody>
                  <CardTitle>
                    Dependability and Security
                  </CardTitle>
                  <CardSubtitle>
                    Worry about your profits not your security
                  </CardSubtitle>
                  <CardText>
                    We utilize best practices when it comes to security in order to ensure that your holdings are never compromised.
                    User accounts/password are stored in a secure, third-party service called Auth0. You also have the ability to enable multi-factor authentication*.
                    <br />
                    <em>Note:</em> We are currently looking into encrypting holdings (API keys, addresses, etc).
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" lg="6">
              <Card>
                <CardImg top width="100%" src={card4} alt="open source gains card image" />
                <CardBody>
                  <CardTitle>
                    Open Source Gains
                  </CardTitle>
                  <CardSubtitle>
                    The best earners are sometimes the least expected
                  </CardSubtitle>
                  <CardText>
                    The saying goes that everyone is a genius in a bull market.  chalupa.io levels the playing field by anonymizing and sharing your portfolio
                    on a global leaderboard**.  Compare yourself to other investors and re-shape your portfolio to meet your financial goals.
                    Or step out of the shadows and forego anonymity.  In a world where money talks you can now step back and let your portfolio do the talking.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" lg="6">
              <Card>
                <CardImg top width="100%" src={card3} alt="usa tax calculations card image" />
                <CardBody>
                  <CardTitle>
                    USA Tax Calculations*
                  </CardTitle>
                  <CardSubtitle>
                    Filing your crypto taxes doesn't have to suck
                  </CardSubtitle>
                  <CardText>
                    Thanks to the recent tax ruling crypto traders (especially day traders) have been forced to go through the painstaking process
                    of documenting hundreds (and thousands) of previous transactions.  Let chalupa.io does this for you. For <b>FREE</b>.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <hr className="my-5 sign-up-divider" />
            </Col>
            <Col xs="12">
              <Jumbotron>
                <h3 className="display-5">Sign Up for chalupa.io</h3>
                <p className="lead">
                  Come for the tool, stay for the community.  Okay, stay for the gains too.
                </p>
                <p className="lead">
                  <Button
                    color="primary"
                    onClick={() => {
                      this.props.authService.signUp();
                    }}
                  >
                    Sign Up
                  </Button>
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="features-disclaimer">
              <p>
                * Coming soon - Q1 2018
              </p>
              <p>
                ** Coming soon - Q2 2018
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Features.propTypes = {
  authService: PropTypes.object.isRequired
};

export default Features;
