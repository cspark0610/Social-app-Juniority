import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { firebaseConfig } from "./firebase/firebase";
import { FirebaseAppProvider } from "reactfire";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./indexStyle";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={"Conectando la app"}>
        <Provider store={store}>
          <BrowserRouter>
            <Route path="/" component={App} />
          </BrowserRouter>
        </Provider>
      </Suspense>
    </FirebaseAppProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
