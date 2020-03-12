import React from "react";
import regeneratorRuntime from "regenerator-runtime";
import { createPaymentIntent } from "../../util/util";

// import CardElement for collecting details
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import ListItem from "../items/listItem";

const styles = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#9e2146"
    }
  }
};

class CheckoutForm extends React.Component {
  constructor({ stripe, elements }) {
    super();

    this.state = {
      message: "",
      cart: []
    };
  }

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart = async () => {
    // gather all our items from localStorage
    let itemIds = Object.keys(localStorage);
    if (itemIds.length < 1) return undefined;
    const items = [];

    itemIds.forEach(id => {
      items.push(JSON.parse(localStorage.getItem(id)));
    });

    await this.setState({ cart: items });
    return items;
  };

  cartSum() {
    let sum = 0;
    this.state.cart.forEach(item => (sum += item.price));
    return sum * 100;
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { stripe, elements } = this.props;

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: "bobby",
        email: "bobby@bobbyg.com"
      }
    });

    return this.handlePaymentMethodResult(result);
  };

  handlePaymentMethodResult = async paymentResult => {
    let price = this.cartSum();
    if (paymentResult.error) {
      this.setState({ message: paymentResult.error });
    } else {
      await createPaymentIntent(
        paymentResult.paymentMethod,
        price
      ).then(response => this.handleServerResponse(response));
    }
  };

  handleServerResponse = serverResponse => {
    console.log(serverResponse);
    if (serverResponse.error) {
      // An error happened when charging the card,
      // show the error in the payment form.
      this.setState({ message: serverResponse.error });
    } else {
      // Show a success message
      // localStorage.clear();
      this.setState({ message: serverResponse.message });
    }
  };

  handleCardChange = event => {
    if (event.error) {
      // Show `event.error.message` in the payment form.
      this.setState({ message: event.error.message });
    }
  };

  render() {
    const { cart } = this.state;
    if (!cart) return <h1>Go find some items to add to your cart</h1>;
    const { stripe } = this.props;
    return (
      <div>
        <ul className="item-list">
          {cart.map(item => (
            <ListItem item={item} key={item._id} />
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <CardElement onChange={this.handleCardChange} options={styles} />
          <button type="submit" disabled={!stripe}>
            Submit Payment
          </button>
          {this.state.message}
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  // wrap  CheckoutForm in ElementsConsumer
  return (
    // assume this is for accessing the stripe object (like mapStatetoProps)
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
