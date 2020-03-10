import React, { Component } from "react";
import ListItem from "./list-item";
import { Link } from "react-router-dom";
import { fetchItems } from "../../util/util";

export default class ItemIndex extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetchItems()
      .then(items => this.setState({ items: items }))
      .catch(err => console.log(err));
  }

  addToCart(item) {
    localStorage.setItem(item._id, JSON.stringify(item));
  }

  render() {
    if (!this.state.items.length > 1) return undefined;

    return (
      <div>
        <h1>Items for Sale</h1>
        <Link to="/checkout">Checkout</Link>
        <ul className="item-list">
          {this.state.items.map(item => (
            <ListItem item={item} key={item._id} addToCart={this.addToCart} />
          ))}
        </ul>
      </div>
    );
  }
}
