import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './account.css'

class Account extends Component {
  render() {
    return(
      <div>
        <h1>Account</h1>
        <br />
        <img src={this.props.auth.profile.picture} height="50px" alt="profile" />
        <br />
        <br />
        <br />
        <p>Username: {this.props.auth.profile.nickname}</p>
        <p>Email: {this.props.auth.profile.email}</p>
      </div>
    );
  }
}

Account.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    error: PropTypes.string,
  }).isRequired,
};

export default Account;
