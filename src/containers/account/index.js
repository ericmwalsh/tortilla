import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Account from "./account_view";

const mapStateToProps = state => ({
  auth: state.auth,
});

// const mapDispatchToProps = dispatch => ({
//   loginRequest: () => dispatch(loginRequest()),
//   logoutSuccess: () => dispatch(logoutSuccess()),
// });

export default withRouter(connect(mapStateToProps, null)(Account));
