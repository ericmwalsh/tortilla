import AuthService from '../utils/auth_service'

export const CCP_REFRESH='portfolio/CCP_REFRESH'
export const CMC_REFRESH='portfolio/CMC_REFRESH'
export const ADD_HOLDING='portfolio/ADD_HOLDING'
export const REMOVE_HOLDING='portfolio/REMOVE_HOLDING'
export const MODIFY_HOLDING='portfolio/MODIFY_HOLDING'
export const EDIT_LIST='portfolio/EDIT_LIST'

export const ccpRefresh = () => {
  return dispatch => {
    var headers = {
      'Authorization': `Bearer ${AuthService.getAccessToken()}`,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    if (AuthService.loggedIn()) {
      // fetch(`${"http://localhost:3000/"}portfolio`, {headers, method: "POST", body: JSON.stringify({holdings: localStorage.getItem('portfolio.holdings')})})
      fetch(`${"http://localhost:3000/"}portfolio`, {headers, method: "GET"})

      // return fetch(`${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}aggregate_month`, {headers})
      return fetch(`${"http://localhost:3000/"}aggregate_month`, {headers})
      .then(response => response.json())
      .then(
        json => {
          dispatch({
            type: CCP_REFRESH,
            data: {
              history: json.data
            }
          })
        }
      );
    } else {
      return fetch(`${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}aggregate_month`)
      .then(response => response.json())
      .then(
        json => {
          dispatch({
            type: CCP_REFRESH,
            data: {
              history: json.data
            }
          })
        }
      );
    }
  }
}

export const cmcRefresh = () => {
  return dispatch => {
    return fetch('https://api.coinmarketcap.com/v1/ticker/?limit=0')
    .then(response => response.json())
    .then(
      json => {
        dispatch({
          type: CMC_REFRESH,
          data: {
            values: json
          }
        })
      }
    );
  }
}

export const addHolding = (currency, amount) => {
  return dispatch => {
    dispatch({
      type: ADD_HOLDING,
      data: {
        currency, amount
      }
    })
  }
}

export const removeHolding = (currency, amount) => {
  return dispatch => {
    dispatch({
      type: REMOVE_HOLDING,
      data: {
        currency
      }
    })
  }
}

export const modifyHolding = (currency, amount) => {
  return dispatch => {
    dispatch({
      type: MODIFY_HOLDING,
      data: {
        currency, amount
      }
    })
  }
}

export const editList = () => {
  return dispatch => {
    dispatch({
      type: EDIT_LIST
    })
  }
}
