import Stripe from 'stripe';

if (!process.env.STRIPE_SK) {
  throw 'STRIPE_SK env var is not set';
}
const stripe = Stripe(process.env.STRIPE_SK);

export default async function handler(_, res) {
  const { client_secret, status } = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({ client_secret, status });
};