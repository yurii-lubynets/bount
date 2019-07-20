import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./store";
import App from "./components/App";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

const { persistor, store } = Store();


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)