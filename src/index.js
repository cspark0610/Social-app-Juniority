import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter, Route} from "react-router-dom"
import { firebaseConfig } from './firebase/firebase';
import { FirebaseAppProvider } from 'reactfire';


ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={ firebaseConfig }>
      <Suspense fallback={'Conectando la app'}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>{" "}
    </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
