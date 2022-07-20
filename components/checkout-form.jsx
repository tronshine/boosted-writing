import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import stripePromise from '../utils/stripe-promise';


const CheckoutElementWrapper = props => {
    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm {...props} />
            </Elements>
        </>
    );
};

const CheckoutForm = ({ onSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [isValid, setValid] = useState(false);


    useEffect(() => {
        elements?.getElement(CardElement)?.on('change', ({ complete }) => {
            if (complete) {
                setValid(true);
            } else {
                setError(false);
            }
        });
        elements?.getElement(CardElement)?.on('ready', () => elements?.getElement(CardElement)?.focus());
    }, [elements]);

    const createPaymentIntent = async () => {
        const response = await fetch('/api/create-payment-intent', { method: 'POST' });
        const { client_secret } = await response.json();
        return { client_secret };
    };

    const confirmPayment = async ({ client_secret }) => {
        const card = elements.getElement(CardElement);

        const { paymentIntent, error } =
            await stripe.confirmCardPayment(client_secret, { payment_method: { card } });

        return paymentIntent?.status === 'succeeded' && !error;
    };

    const handlePayment = async event => {
        event.preventDefault();
        setError(false);
        setLoading(true);
        const response = await createPaymentIntent();
        const success = await confirmPayment(response);
        if (success) {
            onSubmit(false);
        } else {
            setError(true);
            setLoading(false);
            setValid(false);
        }
    };

    return (
        <form onSubmit={handlePayment} className='mt-5'>
            <div className='mt-3'>
                <CardElement className={`p-3 bg-white bg-opacity-75 rounded-md ring-2 ring-inset ring-opacity-50 ${isError ? 'ring-red-600' : 'ring-transparent'} transition-all duration-500`} />
            </div>
            <div className='flex mt-3'>
                <button
                    disabled={!stripe || !elements || !isValid || isLoading}
                    className={`mr-4 disabled:bg-green-100 text-opacity-50 disabled:cursor-not-allowed rounded-md border border-transparent bg-opacity-75 transition-all
                    bg-green-200 px-4 py-2 font-medium text-green-700 hover:bg-green-300 ${isLoading && 'animate-pulse'}`}
                >
                    pay $1 🌳
                </button>
                <button
                    type='button'
                    className='rounded-md border border-transparent bg-red-200 px-4 py-2 font-medium text-red-700 hover:bg-orange-200 focus:outline-none bg-opacity-75 transition-all'
                    onClick={() => onSubmit(true)}
                >
                    delete 🤯
                </button>
            </div>
        </form>
    );
};

export default CheckoutElementWrapper;