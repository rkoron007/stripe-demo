const testKey = require("../../config/keys").secretTestKey;
const stripe = require("stripe")(testKey);

const handleItemPurchase = async (req, res) => {
  try {
    // Create the PaymentIntent
    // PaymentIntents are created one for each order
    let intent = await stripe.paymentIntents.create({
      amount: req.body.price,
      currency: "usd",
      payment_method: req.body.paymentMethodId,
      // make this payment immediately
      confirm: true,
      // will fail two factor auth
      error_on_requires_action: true
    });
    return generateResponse(res, intent);
  } catch (e) {
    if (e.type === "StripeCardError") {
      // Display error on client
      return res.send({ error: e.message });
    } else {
      return res.status(500).send({ error: e.type });
    }
  }
};

function generateResponse(res, intent) {
  if (intent.status === "succeeded") {
    // let the frontend know the payment succeeded
    return res.send({ message: "Success" });
  } else {
    // Any other status would be unexpected, so error
    return res
      .status(500)
      .send({ error: "Unexpected status " + intent.status });
  }
}

module.exports = handleItemPurchase;
