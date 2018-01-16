import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col } from 'reactstrap';

import './footer.css'

class Footer extends Component {
  render() {
    return(
      <footer className="footer">
        <Container>
          <Row>
            <Col xs="4">
              <p>
                © 2018 chalupa.io
              </p>
            </Col>
            <Col xs="4">
              <p>
                <Link to="/" className="footer-link">
                  Home
                </Link>
                <Link to="/about" className="footer-link">
                  About
                </Link>
                <a href="mailto:eric@chalupa.io" target="_blank" className="footer-link">
                  Contact
                </a>
              </p>
            </Col>
            <Col xs="4">
              <p>
                Donate
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
