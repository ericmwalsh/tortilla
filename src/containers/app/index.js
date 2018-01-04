import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './app.css';

import withTracker from './with_tracker'
import AuthService from '../../utils/auth_service'

import Header from '../../components/header'

import Portfolio from '../portfolio'
import About from '../../components/about'
import NotFound from '../../components/not_found'

import { loginSuccess, loginError } from '../../actions/auth'

class App extends Component {

  constructor(props) {
    super(props);

    this.authService = new AuthService();
  }

  componentWillMount() {
    // Add callback for lock's `authenticated` event
    this.authService.lock.on('authenticated', (authResult) => {
      this.authService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) { return this.props.loginError(error); }
        AuthService.setToken(authResult); // static method
        AuthService.setProfile(profile); // static method
        this.props.loginSuccess(profile);
        setTimeout(
          () => {
            this.authService.lock.hide();
          },
          100
        );
        return this.props.history.push({ pathname: '/' });
      });
    });
    // Add callback for lock's `authorization_error` event
    this.authService.lock.on('authorization_error', (error) => {
      this.props.loginError(error);
      return this.props.history.push({ pathname: '/' });
    });
  }

  render() {
    return(
      <div className="App">
        <Header authService={this.authService} />
        <br/>
        <main className="App-Main">
          <Switch>
            <Route exact path="/" component={withTracker(Portfolio)} />
            <Route exact path="/about" component={withTracker(About)} />
            <Route component={withTracker(NotFound)} />
          </Switch>
        </main>
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

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(loginSuccess(profile)),
  loginError: error => dispatch(loginError(error)),
});

export default withRouter(connect(
  null, // no mapStateToProps
  mapDispatchToProps,
)(App));
