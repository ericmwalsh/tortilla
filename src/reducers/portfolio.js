import ExamplePortfolio from '../constants/example_portfolio'
import {
  CMC_REFRESH,
  ADD_HOLDING,
  REMOVE_HOLDING,
  MODIFY_HOLDING,
  EDIT_LIST
} from '../actions/portfolio'


function obtainHoldings() {
  var holdings = JSON.parse(localStorage.getItem('portfolio.holdings'));
  if (holdings == null) {
    holdings = ExamplePortfolio.data0;
  }
  return holdings;
}

const initialState =  {
  currencySymbols: [],
  history: [],
  holdings: obtainHoldings(),
  list: [],
  listEditable: false,
  total: 0,
  values: []
}

function determineListAndTotal(holdings, coins) {
  var list = [];
  var total = 0;

  holdings.forEach(
    (holding, i) => {
      var coin_hash = coins.find(
        (coin) => {
          return coin.symbol === holding[0];
        }
      )

      if (coin_hash) {
        var portfolio_coin_hash = {
          name: coin_hash.name,
          symbol: holding[0],
          amount: holding[1],
          price: parseFloat(coin_hash.price_usd),
          change_h: parseFloat(coin_hash.percent_change_1h),
          change_d: parseFloat(coin_hash.percent_change_24h),
          change_w: parseFloat(coin_hash.percent_change_7d),
          value: holding[1] * parseFloat(coin_hash.price_usd),
          order: i
        }

        list.push(portfolio_coin_hash);
        total += portfolio_coin_hash.value
      }
    }
  )

  return [
    list,
    total,
    coins.map(coin => coin.symbol).sort()
  ]
}

function setDocumentTitle(title) {
  document.title = `$${title.toFixed(2)}`;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CMC_REFRESH:
      var holdings = state.holdings;
      var values = action.data.values;

      var listAndTotal = determineListAndTotal(holdings, values);
      setDocumentTitle(listAndTotal[1]);
      return {
        ...state,
        currencySymbols: listAndTotal[2],
        list: listAndTotal[0],
        total: listAndTotal[1],
        values: values
      }

    case ADD_HOLDING:
      // action.data.currency, action.data.amount
      var holdings = state
                        .holdings
                        .filter(holding => holding[0] !== action.data.currency);
      holdings.push([action.data.currency, action.data.amount]);

      var listAndTotal = determineListAndTotal(holdings, state.values);

      localStorage.setItem('portfolio.holdings', JSON.stringify(holdings))
      setDocumentTitle(listAndTotal[1]);
      return {
        ...state,
        holdings: holdings,
        list: listAndTotal[0],
        total: listAndTotal[1]
      }

    case REMOVE_HOLDING:
      // action.data.currency
      var holdings = state
                        .holdings
                        .filter(holding => holding[0] !== action.data.currency);

      var listAndTotal = determineListAndTotal(holdings, state.values);

      localStorage.setItem('portfolio.holdings', JSON.stringify(holdings))
      setDocumentTitle(listAndTotal[1]);
      return {
        ...state,
        holdings: holdings,
        list: listAndTotal[0],
        total: listAndTotal[1]
      }

    case MODIFY_HOLDING:
      // action.data.currency, action.data.amount
      var holdings = state
                        .holdings
                        .map(holding => holding[0] === action.data.currency ? [action.data.currency, action.data.amount] : holding);

      var listAndTotal = determineListAndTotal(holdings, state.values);

      localStorage.setItem('portfolio.holdings', JSON.stringify(holdings))
      setDocumentTitle(listAndTotal[1]);
      return {
        ...state,
        holdings: holdings,
        list: listAndTotal[0],
        total: listAndTotal[1]
      }

    case EDIT_LIST:
      return {
        ...state,
        listEditable: !state.listEditable
      }

    default:
      return state
  }
}
