import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ccpRefresh, cmcRefresh } from "../../actions/portfolio";

import { loginSuccess, loginError } from "../../actions/auth";

import App from "./app_view";

// const mapDispatchToProps = dispatch => ({
//   loginSuccess: profile => dispatch(loginSuccess(profile)),
//   loginError: error => dispatch(loginError(error)),
// });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ccpRefresh,
      cmcRefresh,
      loginSuccess,
      loginError,
    },
    dispatch,
  );

export default withRouter(
  connect(
    null, // no mapStateToProps
    mapDispatchToProps,
  )(App),
);
