import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import logo from './logo.svg';
import './header.css';

class Header extends Component {

  render() {
    return(
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">coinucop.io</h1>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </header>
    )
  }

}

export default Header;
