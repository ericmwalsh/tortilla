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
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Tooltip } from 'reactstrap';

import AuthService from '../../utils/auth_service'

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
          <NavbarBrand href="/">coinucop.io</NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.navIsOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </NavItem>

              <NavItem>
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </NavItem>

              {this.props.auth.isAuthenticated ?
                <NavItem>
                  <Dropdown isOpen={this.state.userDropdownOpen} toggle={this.toggleUserDropdown}>
                    <DropdownToggle caret>
                      {this.props.auth.profile.picture &&
                        <img src={this.props.auth.profile.picture} height="30px" alt="profile" />
                      }
                      <span> {this.props.auth.profile.nickname}</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link className="nav-link" to="/account">
                          Account
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <a className="nav-link"
                          onClick={() => {
                            AuthService.logout(); // careful, this is a static method
                            this.props.logoutSuccess();
                            this.props.history.push({ pathname: '/' });
                          }}
                        >
                          Logout
                        </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
                :
                <NavItem>
                  <button className="nav-link"
                    onClick={() => {
                      this.props.authService.login();
                      this.props.loginRequest();
                    }}
                  >
                    Login
                  </button>
                </NavItem>
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
