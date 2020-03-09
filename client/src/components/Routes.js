import React, { Component } from "react";
import { Route } from "react-router-dom";

import ItemIndex from "./items/itemIndex";
import checkOut from "./items/checkout";

const Routes = () => {
  <div>
    <Route path="/" component={ItemIndex} />
    <Route path="/checkout" component={checkOut} />
  </div>;
};

export default Routes;
