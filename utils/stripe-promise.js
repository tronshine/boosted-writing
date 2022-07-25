import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51LLNw3CVLTDSnHnIqal0xLbkdAjO4PUqFuFu11IxyUZCpLQUHq8duini6a06pz39Ww6hou3MevzKznDbcSIUoJqX00cbGluNVf');

export default stripePromise;