import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './not_found.css'

class NotFound extends Component {
  render() {
    return(
      <div>
        <h1>This page doesn't exist.</h1>
        <br/>
        <br/>
        <br/>
        <h3>
          <Link to="/">Coinucopio</Link>
        </h3>
        <p>Open source index funds.  Track your portfolio, share your gains, reap the rewards.</p>
        <br/>
      </div>
    );
  }
}

export default NotFound;
