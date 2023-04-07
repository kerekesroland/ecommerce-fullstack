import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripe: Stripe | null;

export const initializeStripe = async () => {
  if (!stripe && process.env.REACT_APP_stripe_publishable_key) {
    stripe = await loadStripe(process.env.REACT_APP_stripe_publishable_key);
  }
  return stripe;
};
