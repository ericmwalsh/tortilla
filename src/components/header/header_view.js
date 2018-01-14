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
  NavLink,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Tooltip } from 'reactstrap';

import AuthService from '../../utils/auth_service'

import logo from './logo.png'
import './header.css';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navIsOpen: false,
      tooltipIsOpen: false,
      userDropdownOpen: false
    }
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.toggleUserDropdown = this.toggleUserDropdown.bind(this);
  }

  toggleNav() {
    this.setState({
      navIsOpen: !this.state.navIsOpen
    });
  }

  toggleTooltip() {
    this.setState({
      tooltipIsOpen: !this.state.tooltipIsOpen
    });
  }

  toggleUserDropdown() {
    this.setState({
      userDropdownOpen: !this.state.userDropdownOpen
    });
  }

  render() {
    return (
      <div className="Header">
        <Navbar color="faded" light expand="md">
          <NavbarBrand tag={Link} to="/">
            <img src={logo} alt="Chalupa.io logo" className="header-logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.navIsOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} to="/about">
                  About
                </NavLink>
              </NavItem>

              {this.props.auth.isAuthenticated ?
                <NavItem>
                  <Dropdown isOpen={this.state.userDropdownOpen} toggle={this.toggleUserDropdown}>
                    <DropdownToggle color="white">
                      {this.props.auth.profile.picture &&
                        <img src={this.props.auth.profile.picture} height="30px" alt="profile" />
                      }
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink tag={Link} to="/account">
                          Account
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink
                          className="log-out-link"
                          onClick={() => {
                            AuthService.logout(); // careful, this is a static method
                            this.props.logoutSuccess();
                            this.props.history.push({ pathname: '/' });
                          }}
                        >
                          Log Out
                        </NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
                :
                [
                  <NavItem key="sign-up">
                    <NavLink
                      className="sign-up-link"
                      onClick={() => {
                        this.props.authService.signUp();
                        this.props.loginRequest();
                      }}
                    >
                      Sign Up
                    </NavLink>
                  </NavItem>,
                  <NavItem key="log-in">
                    <NavLink
                      className="log-in-link"
                      onClick={() => {
                        this.props.authService.logIn();
                        this.props.loginRequest();
                      }}
                    >
                      Log In
                    </NavLink>
                  </NavItem>
                ]
              }


              {this.props.auth.error &&
                <div>
                  <NavItem id="error-tooltip">
                    <div className="nav-link">!!!</div>
                  </NavItem>
                  <Tooltip
                    placement="auto"
                    isOpen={this.state.tooltipIsOpen}
                    target="error-tooltip"
                    toggle={this.toggleTooltip}
                  >
                    <p>{this.props.auth.error.error} : {this.props.auth.error.errorDescription}</p>
                  </Tooltip>
                </div>
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
