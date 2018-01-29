import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import "./app.css";

import withTracker from "./with_tracker";
import AuthService from "../../utils/auth_service";

import Footer from "../../components/footer";
import Header from "../../components/header";

import Portfolio from "../portfolio";
import About from "../../components/about";
import Account from "../../components/account";
import Features from "../../components/features";
import NotFound from "../../components/not_found";

class App extends Component {
  constructor(props) {
    super(props);
    // AuthService.clearOldNonces(); // house cleaning
    this.authService = new AuthService();
    // user is logged in but expired, need to refresh the token
    this.authService.checkSession(props.loginSuccess, props.loginError);
  }

  componentWillMount() {
    this.props.cmcRefresh();
    // Add callback for lock's `authenticated` event
    this.authService.setupAuthentication(this.props.loginSuccess);
    // Add callback for lock's `authorization_error` event
    this.authService.setupErrorHandling(
      this.props.loginError,
      this.props.history,
    );
  }

  componentDidMount() {
    setInterval(
      () => this.props.cmcRefresh(),
      60000, // 1 min
    );
    setInterval(
      () => this.props.ccpRefresh(),
      3600000, // 1 hr
    );
  }

  render() {
    return (
      <div className="App">
        <Header authService={this.authService} />
        <br />
        <main className="App-Main">
          <Switch>
            <Route exact path="/" component={withTracker(Portfolio)} />
            <Route
              exact
              path="/features"
              component={withTracker(Features, {
                authService: this.authService,
              })}
            />
            <Route exact path="/about" component={withTracker(About)} />
            <Route exact path="/account" component={withTracker(Account)} />
            <Route component={withTracker(NotFound)} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
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
