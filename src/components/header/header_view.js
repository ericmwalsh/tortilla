import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

import AuthService from '../../utils/auth_service'

import './header.css';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="Header">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">coinucop.io</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/">
                  <NavLink>
                    Home
                  </NavLink>
                </Link>
              </NavItem>

              <NavItem>
                <Link to="/about">
                  <NavLink>
                    About
                  </NavLink>
                </Link>
              </NavItem>

              {this.props.auth.isAuthenticated ?
                <div>
                  <img src={this.props.auth.profile.picture} height="40px" alt="profile" />
                  <span>Welcome, {this.props.auth.profile.nickname}</span>
                  <button
                    onClick={() => {
                      this.props.logoutSuccess();
                      AuthService.logout(); // careful, this is a static method
                      this.props.history.push({ pathname: '/' });
                    }}
                  >
                    Logout
                  </button>
                </div>
                :
                <button
                  onClick={() => {
                    this.props.authService.login();
                    this.props.loginRequest();
                  }}
                >
                  Login
                </button>
              }
              {this.props.auth.error &&
                <p>{this.props.auth.error}</p>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  authService: PropTypes.object.isRequired, // eslint-disable-line
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    error: PropTypes.string,
  }).isRequired,
  loginRequest: PropTypes.func.isRequired,
  logoutSuccess: PropTypes.func.isRequired,
};

export default Header;