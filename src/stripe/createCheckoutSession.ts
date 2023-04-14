import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { initializeStripe } from "./initializeStripe";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

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

//--------------------------Payment-----------------------------------------------

/** This works
 * body: new URLSearchParams({
      "payment_method_types[]": "card",
      "line_items[][price_data][currency]": "usd",
      "line_items[][price_data][product_data][name]": "T-shirt",
      "line_items[][price_data][unit_amount]": "2000",
      "line_items[][quantity]": "1",
      mode: "payment",
      success_url: "http://localhost:3000/checkout",
      cancel_url: "http://localhost:3000/checkout",
    }).toString(),
 */

export const handlePayment = async (uid: string, items: any) => {
  const line_items = items.reduce((acc: any, item: any, index: any) => {
    acc[`line_items[${index}][price_data][currency]`] = "usd";
    acc[`line_items[${index}][price_data][product_data][name]`] = "Shirt";
    acc[`line_items[${index}][price_data][unit_amount]`] = 2500;
    acc[`line_items[${index}][quantity]`] = "1";
    return acc;
  }, {});

  const formData = new URLSearchParams();
  formData.append("payment_method_types[]", "card");
  for (const [key, value] of Object.entries(line_items)) {
    //@ts-ignore
    formData.append(key, value);
  }
  formData.append("mode", "payment");
  formData.append("success_url", "http://localhost:3000/checkout");
  formData.append("cancel_url", "http://localhost:3000/checkout");

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${process.env.REACT_APP_stripe_secret_key}`,
    },
    body: formData,
  });

  const sessionData = await response.json();

  console.log(sessionData);

  const checkoutSessionRef = await addDoc(
    collection(db, "users", uid, "checkout_sessions"),
    {
      price: "price_1MwmcUKTsbxvOHwnNV8eVqKR",
      success_url: "http://localhost:3000/checkout",
      cancel_url: "http://localhost:3000/checkout",
      mode: "payment",
    }
  );

  onSnapshot(checkoutSessionRef, async (snap: any) => {
    const { sessionId } = await snap.data();
    console.log(await snap.data());
    const stripe = await initializeStripe();
    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId });
    }
  });
};
