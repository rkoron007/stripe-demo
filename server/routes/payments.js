const testKey = require("../../config/keys").secretTestKey;
const stripe = require("stripe")(testKey);

const handleItemPurchase = async (req, res) => {
  try {
    // Create the PaymentIntent
    // PaymentIntents are created one or each order
    let price = parseInt(req.body.price);

    // using test data for now
    let cardData = await generatePaymentMethod();
    console.log(cardData);
    let intent = await stripe.paymentIntents.create({
      amount: price,
      currency: "usd",
      payment_method: cardData.id,

      // A PaymentIntent can be confirmed some time after creation,
      // but here we want to confirm (collect payment) immediately.
      confirm: true,

      // If the payment requires any follow-up actions from the
      // customer, like two-factor authentication, Stripe will error
      // and you will need to prompt them for a new payment method.
      error_on_requires_action: true
    });

    console.log(intent);
    return generateResponse(res, intent);
  } catch (e) {
    console.log(e);
    if (e.type === "StripeCardError") {
      // Display error on client
      console.log(e);
      return res.send({ error: e.message });
    } else {
      return res.status(500).send({ error: e.type });
    }
  }
};

function generateResponse(res, intent) {
  if (intent.status === "succeeded") {
    // let the frontend know the payment succeeded
    console.log("success!");
    return res.send({ success: true });
  } else {
    // Any other status would be unexpected, so error
    return res
      .status(500)
      .send({ error: "Unexpected status " + intent.status });
  }
}

const generatePaymentMethod = async () => {
  // just going to use this testing data for now
  // but would refactor this into card data object later

  // let number = cardData.number ? cardData.number : "4242424242424242";
  // let month = cardData.month ? cardData.month : 3;
  // let year = cardData.year ? cardData.year : 2021;
  // let cvc = cardData.cvc ? cardData.cvc : "314";
  let number = "4242424242424242";
  let month = 3;
  let year = 2021;
  let cvc = "314";

  return await stripe.paymentMethods.create({
    type: "card",
    card: {
      number: number,
      exp_month: month,
      exp_year: year,
      cvc: cvc
    }
  });
};

module.exports = handleItemPurchase;
