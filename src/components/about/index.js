import React, { Component } from 'react'
import {
  Container,
  Row,
  Col } from 'reactstrap';
import { Link } from 'react-router-dom'

import './about.css'
import logo from './logo.png'
import facebook from './facebook.png'
import gmail from './gmail.png'
import github from './github.png'
import instagram from './instagram.png'
import twitter from './twitter.png'

class About extends Component {
  render() {
    return(
      <div className="about">
        <h1>About</h1>
        <br />
        <br />
        <Container>
          <Row>
            <Col xs="12">
              <h4><b>chalupa.io</b></h4>
              <p>Cryptocurrency Portfolio Management</p>
              <p>Track your portfolio, share your gains, reap the rewards.</p>
              <hr className="my-4" />
              <div className="about-info">
                <p>
                  <b>chalupa.io</b> (originally Coinucopio) is the brainchild of Eric Walsh.
                  It was created in December, 2017 as a result of his frustratation with existing cryptocurrency
                  tools which either lacked functionality (...) or were overpriced (...).  It is developed and
                  maintained in beautiful Long Beach, California.
                </p>
                <p>
                  While <b>chalupa.io</b> may be late to the game it still has an opportunity to shift the playing field.
                  Upgrades and improvements to the platform happen on a continual basis and there is no other tool
                  that offers all the features that <b>chalupa.io</b> has in the pipeline.
                </p>
                <p>
                  <b>chalupa.io</b> is currently developed by an extremely talented, super passionate team... of one (Eric Walsh)!
                  I am a Software Engineer at TrueCar in Santa Monica, CA and my focus is on back end technologies (Ruby on Rails).
                  Because <b>chalupa.io</b> is currently a side project I am only able to make updates to it on nights and weekends.
                </p>
                <p>
                  This also means that I am paying for all fees (hosting, domain names, service fees) for <b>chalupa.io</b> out of pocket.  While
                  the fees are manageable for now I do plan on monetizing this platform by adding paid/premium features in the distant future.
                  Rest assured, I pledge to keep this tool both free to use and ad free forever. I will NEVER turn existing free features
                  into paid features and will NEVER sell any user data.
                </p>
                <p>
                  I have an unwavering belief that cryptocurrency will be an integral part of our future.  While it may currently be in its infancy,
                  like the internet in the mid-late 90s, it will be utilized in numerous industries in the years to come.  Right now I dedicate as
                  much of my free time as I can to advancing this project but its tough to keep up with the rapid pace of this industry. If you are
                  interested in contributing to or supporting <b>chalupa.io</b> in any way please contact me via email () or via any of
                  the social media platforms listed below.  All contributions are GREATLY appreciated!
                </p>
              </div>
            </Col>
            <Col xs="12">
              <a href="mailto:eric@chalupa.io" target="_blank">
                <img className="social-media-icon" src={gmail} />
              </a>
              <a href="https://twitter.com/ericmdub92" target="_blank">
                <img className="social-media-icon" src={twitter} />
              </a>
              <a href="https://github.com/ChalupaIO" target="_blank">
                <img className="social-media-icon" src={github} />
              </a>
              <a href="https://www.instagram.com/chalupa.io/" target="_blank">
                <img className="social-media-icon" src={instagram} />
              </a>
              <a href="https://www.facebook.com/chalupa.io/" target="_blank">
                <img className="social-media-icon" src={facebook} />
              </a>
              <br />
              <br />
              <br />
              <br />
              <h5>Powered by...</h5>
              <p>
                API: CoinMarketCap
                <br />
                Server(s): Heroku
              </p>
              <br />
              <br />
              <Link to="/">
                <img src={logo} alt="Logo" className="chalupaio-logo" />
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default About;
