import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import "bootstrap/dist/css/bootstrap.css";

import App from "./containers/app/";
import store, { history } from "./utils/store";
import registerServiceWorker from "./utils/registerServiceWorker";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
