export const CCP_REFRESH='portfolio/CCP_REFRESH'
export const CMC_REFRESH='portfolio/CMC_REFRESH'

export const REFRESH='portfolio/REFRESH'
export const ADD_HOLDING='portfolio/ADD_HOLDING'
export const REMOVE_HOLDING='portfolio/REMOVE_HOLDING'
export const MODIFY_HOLDING='portfolio/MODIFY_HOLDING'
export const EDIT_LIST='portfolio/EDIT_LIST'

export const ccpRefresh = () => {
  return dispatch => {
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

export const cmcRefresh = () => {
  return dispatch => {
    return fetch(`${process.env.REACT_APP_CRYPTO_PORTFOLIO_URL}cmc_cache`)
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

export const refresh = () => {
  return dispatch => {
    dispatch({
      type: REFRESH
    })
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
