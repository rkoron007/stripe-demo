import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripeTestKey } from "../../config/keys";

import ItemIndex from "./items/item-index";
import CheckoutForm from "./items/checkout";

const stripePromise = loadStripe(stripeTestKey);

const App = () => (
  <Elements stripe={stripePromise}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ItemIndex} />
        <Route exact path="/checkout" component={CheckoutForm} />
        <Redirect to="/"></Redirect>
      </Switch>
    </HashRouter>
  </Elements>
);

export default App;
