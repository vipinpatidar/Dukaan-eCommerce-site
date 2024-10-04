import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_KEY);

export const postStipeCharges = async (req, res) => {
  try {
    // const stripeResponse = await stripe.charges.create({
    //   source: req.body.tokenId,
    //   amount: req.body.amount,
    //   currency: "usd",
    // });

    const stripeResponse = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      description: "test payment of eCommerce app",
      shipping: {
        name: "vipin patidar",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      automatic_payment_methods: { enabled: true },
    });

    // console.log(stripeResponse);

    res.status(200).json(stripeResponse.client_secret);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
