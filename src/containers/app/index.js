import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginSuccess, loginError } from '../../actions/auth'

import App from './app_view'

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(loginSuccess(profile)),
  loginError: error => dispatch(loginError(error)),
});

export default withRouter(connect(
  null, // no mapStateToProps
  mapDispatchToProps,
)(App));
