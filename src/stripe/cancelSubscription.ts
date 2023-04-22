import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { initializeStripe } from "./initializeStripe";
import { auth, db } from "../firebase/config";

export default async function cancelSubscription(subscription_key?: string) {
  const stripe = await initializeStripe();
  if (stripe && subscription_key) {
    const apiKey = process.env.REACT_APP_stripe_secret_key;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    await fetch(`https://api.stripe.com/v1/subscriptions/${subscription_key}`, {
      method: "DELETE",
      headers: headers,
    })
      .then(async (response) => {
        const subscriptionsRef = collection(
          db,
          "users",
          auth?.currentUser?.uid as string,
          "subscriptions"
        );
        const q = query(subscriptionsRef);

        const querySnapshot = await getDocs(q);

        const subscription = querySnapshot.docs
          .map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((subscription) => subscription.status !== "canceled")[0];

        const subscriptionRef = doc(
          db,
          "users",
          auth?.currentUser?.uid as string,
          "subscriptions",
          subscription.id
        );

        await updateDoc(subscriptionRef, {
          role: null,
          status: "canceled",
          canceled_at: new Date(),
          ended_at: new Date(),
        });

        if (!response.ok) {
          throw new Error("Failed to cancel subscription.");
        }
        console.log(`Subscription ${subscription_key} is now canceled.`);
      })
      .catch((error) => {
        console.error("Error canceling subscription:", error);
      });
  }
}
