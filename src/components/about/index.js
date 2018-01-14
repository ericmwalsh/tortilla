import React, { Component } from 'react'
import logo from './logo.png'

class About extends Component {
  render() {
    return(
      <div>
        <h1>About</h1>
        <p>Cryptocurrency portfolio management - Track your portfolio, share your gains, reap the rewards.</p>
        <br/>
        <a href="https://github.com/ChalupaIO">Github</a>
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
