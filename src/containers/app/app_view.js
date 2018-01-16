import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'

import './app.css';

import withTracker from './with_tracker'
import AuthService from '../../utils/auth_service'

import Footer from '../../components/footer'
import Header from '../../components/header'

import Portfolio from '../portfolio'
import About from '../../components/about'
import Account from '../../components/account'
import Features from '../../components/features'
import NotFound from '../../components/not_found'

class App extends Component {

  constructor(props) {
    super(props);
    // AuthService.clearOldNonces(); // house cleaning

    this.authService = new AuthService();

    if (AuthService.tokenExists() && !AuthService.loggedIn()) {
      this.authService.lock.checkSession(
        {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'openid profile email',
          responseType: 'token id_token',
        },
        (err, authResult) => {
          if (err) {
            AuthService.clearStorage();
            props.loginError(err);
          } else {
            this.authService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
              if (error) { return props.loginError(error); }
              AuthService.login(authResult, profile);
              // return props.loginSuccess(profile);

              var headers = {
                'Authorization': `Bearer ${authResult.accessToken}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              }

              fetch(`${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}portfolio`, {headers})
              .then(response => response.json())
              .then(
                json => {
                  // new account
                  if (json.data === "") {
                    var holdings = localStorage.getItem('portfolio.holdings');
                    if (holdings) {
                      fetch(
                        `${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}portfolio`,
                        {
                          headers,
                          method: "POST",
                          body: JSON.stringify({holdings: holdings})
                        }
                      )
                    }
                  }
                  // load stored holdings
                  else {
                    localStorage.setItem('portfolio.holdings', json.data)
                  }
                  return this.props.loginSuccess(profile);
                }
              );
            });
          }
        }
      );
    }
  }

  componentWillMount() {
    this.props.cmcRefresh()
    // Add callback for lock's `authenticated` event
    this.authService.lock.on('authenticated', (authResult) => {
      this.authService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) { return this.props.loginError(error); }
        AuthService.login(authResult, profile); // static method

        var headers = {
          'Authorization': `Bearer ${authResult.accessToken}`,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }

        fetch(`${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}portfolio`, {headers})
        .then(response => response.json())
        .then(
          json => {
            // new account
            if (json.data === "") {
              var holdings = localStorage.getItem('portfolio.holdings');
              if (holdings) {
                fetch(
                  `${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}portfolio`,
                  {
                    headers,
                    method: "POST",
                    body: JSON.stringify({holdings: holdings})
                  }
                )
              }
            }
            // load stored holdings
            else {
              localStorage.setItem('portfolio.holdings', json.data)
            }
            return this.props.loginSuccess(profile);
          }
        );
        // return this.props.history.push({ pathname: '/' });
      });
    });
    // Add callback for lock's `authorization_error` event
    this.authService.lock.on('authorization_error', (error) => {
      this.props.loginError(error);
      return this.props.history.push({ pathname: '/' });
    });
  }

  componentDidMount() {
    setInterval(
      () => this.props.cmcRefresh(),
      60000 // 1 min
    )
    setInterval(
      () => this.props.ccpRefresh(),
      3600000 // 1 hr
    )
  }

  render() {
    return(
      <div className="App">
        <Header authService={this.authService} />
        <br/>
        <main className="App-Main">
          <Switch>
            <Route exact path="/" component={withTracker(Portfolio)} />
            <Route
              exact
              path="/features"
              component={withTracker(Features, {authService: this.authService})}
            />
            <Route exact path="/about" component={withTracker(About)} />
            <Route exact path="/account" component={withTracker(Account)} />
            <Route component={withTracker(NotFound)} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }

}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginSuccess: PropTypes.func.isRequired,
  loginError: PropTypes.func.isRequired,
};

export default App;
