import React, { Component } from 'react'
import logo from './login_logo.png'

class About extends Component {
  render() {
    return(
      <div>
        <h1>About</h1>
        <p>Open source index funds.  Track your portfolio, share your gains, reap the rewards.</p>
        <br/>
        <a href="https://github.com/coinucopio">Github</a>
        <br />
        <a href="https://twitter.com/ericmdub92">Twitter</a>
        <br />
        <br />
        <br />
        <p>API: CoinMarketCap</p>
        <br />
        <br />
        <img src={logo} alt="Logo" />
      </div>
    );
  }
}

export default About;
