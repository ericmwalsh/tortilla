import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

import "./footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col xs="4">
              <p>©2018 chalupa.io</p>
            </Col>
            <Col xs="4">
              <p>
                <Link to="/" className="footer-link desktop-only">
                  Home
                </Link>
                <Link to="/about" className="footer-link desktop-only">
                  About
                </Link>
                <a
                  href="mailto:eric@chalupa.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Contact
                </a>
              </p>
            </Col>
            <Col xs="4">
              <p>
                <b
                  onClick={this.toggle}
                  onKeyPress={this.toggle}
                  role="button"
                  tabIndex={0}
                  id="footer-donate"
                  className="donate-link"
                >
                  Donate
                </b>
                <Popover
                  placement="top"
                  isOpen={this.state.popoverOpen}
                  target="footer-donate"
                  toggle={this.toggle}
                >
                  <PopoverHeader>
                    Thank you for your contribution!
                  </PopoverHeader>
                  <PopoverBody>
                    I currently pay for all <b>chalupa.io</b> fees out of pocket
                    so all donations will go towards keeping the site up and
                    running!
                    <br />
                    <b>BTC Address:</b>{" "}
                    <em>{process.env.REACT_APP_BTC_ADDRESS}</em>
                    <br />
                    <b>ETH Address:</b>{" "}
                    <em>{process.env.REACT_APP_ETH_ADDRESS}</em>
                  </PopoverBody>
                </Popover>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
