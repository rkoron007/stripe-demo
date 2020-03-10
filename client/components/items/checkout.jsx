import React from "react";
import regeneratorRuntime from "regenerator-runtime";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

class CheckoutForm extends React.Component {
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

    this.handlePaymentMethodResult(result);
  };

  handlePaymentMethodResult = async result => {
    if (result.error) {
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 3)
      const response = await fetch("/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id
        })
      });

      const serverResponse = await response.json();

      this.handleServerResponse(serverResponse);
    }
  };

  handleServerResponse = serverResponse => {
    if (serverResponse.error) {
      // An error happened when charging the card,
      // show the error in the payment form.
    } else {
      // Show a success message
    }
  };

  handleCardChange = event => {
    if (event.error) {
      // Show `event.error.message` in the payment form.
    }
  };

  render() {
    const { stripe } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement onChange={this.handleCardChange} />
        <button type="submit" disabled={!stripe}>
          Submit Payment
        </button>
      </form>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
