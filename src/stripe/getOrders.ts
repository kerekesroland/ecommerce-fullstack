import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const getOrders = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const stripeId = await docSnap?.data()?.stripeId;

    if (!stripeId) return null;

    const res = await fetch(
      `https://api.stripe.com/v1/payment_intents?customer=${stripeId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_stripe_secret_key}`,
        },
      }
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
