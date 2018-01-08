import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  ccpRefresh,
  cmcRefresh,
  refresh,
  addHolding,
  removeHolding,
  modifyHolding,
  editList
} from '../../actions/portfolio'

import Portfolio from './portfolio_view'

const mapStateToProps = state => ({
  currencySymbols: state.portfolio.currencySymbols,
  history: state.portfolio.history,
  holdings: state.portfolio.holdings,
  list: state.portfolio.list,
  listEditable: state.portfolio.listEditable,
  total: state.portfolio.total,
  auth: state.auth
})

const mapDispatchToProps = dispatch => bindActionCreators({
  ccpRefresh,
  cmcRefresh,
  refresh,
  addHolding,
  removeHolding,
  modifyHolding,
  editList
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
