import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51LLNw3CVLTDSnHnImGh78fqQIU2Gm1hMu6nY6XyZZS7Hvs3SdSRuUFCk4wLenNt9P4NktCv5isOQ1MRcA570kkLo00wch7SMRS');

export default stripePromise;