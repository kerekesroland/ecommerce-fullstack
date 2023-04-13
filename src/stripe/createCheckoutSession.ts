import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { initializeStripe } from "./initializeStripe";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export const createPremiumBronzeSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: process.env.REACT_APP_stripe_bronze_key,
      success_url: "http://localhost:3000/profile",
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      const res = await stripe.redirectToCheckout({ sessionId });
      if (res.error) {
        toast.error("Error during payment", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
        });
      } else {
        toast.success("Successful subscription!", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
        });
      }
    }
  });
};

export const createPremiumSilverSession = async (uid: string) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: process.env.REACT_APP_stripe_silver_key,
      success_url: "http://localhost:3000/profile",
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
      success_url: "http://localhost:3000/profile",
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
