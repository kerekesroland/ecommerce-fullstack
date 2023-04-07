import { db } from "../firebase/config";
import { initializeStripe } from "./initializeStripe";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export const createCheckoutSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: "price_1MtDoqKTsbxvOHwnFNo3dYKJ",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    }
  });
};

export const createPremiumBronzeSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: process.env.REACT_APP_stripe_bronze_key,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    }
  });
};
export const createPremiumSilverSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: process.env.REACT_APP_stripe_silver_key,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    }
  });
};
export const createPremiumGoldSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: process.env.REACT_APP_stripe_gold_key,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    }
  });
};
