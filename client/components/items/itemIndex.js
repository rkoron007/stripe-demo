import React, { Component } from "react";
import ListItem from "./listItem";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
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
    if (!this.state.items.length > 1) return <h1>Loading...</h1>;

    return (
      <div className="header">
        <div className="header-nav">
          <h1>Items for Sale</h1>
          <Link className="checkout-Btn" to="/checkout">
          <Button>Checkout</Button>
          </Link>
        </div>
        <ul className="item-list">
          {this.state.items.map(item => (
            <ListItem item={item} key={item._id} addToCart={this.addToCart} />
          ))}
        </ul>
      </div>
    );
  }
}
