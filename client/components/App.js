import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripeTestKey } from "../../config/keys";

import ItemIndex from "./items/itemIndex";
import CheckoutForm from "./checkout/checkoutForm";

const stripePromise = loadStripe(stripeTestKey);

const App = () => (
  // allows use to use Element components and access the stripe object
  // sort of like allowing Redux state access
    // returns a promise
  // the stripe object allow access to Stripe's SDK
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
