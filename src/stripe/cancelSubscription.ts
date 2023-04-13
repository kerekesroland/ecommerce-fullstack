import { initializeStripe } from "./initializeStripe";

export default async function cancelSubscription(subscription_key?: string) {
  const stripe = await initializeStripe();
  if (stripe) {
    const apiKey = process.env.REACT_APP_stripe_secret_key;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    console.log(subscription_key);

    await fetch(`https://api.stripe.com/v1/subscriptions/${subscription_key}`, {
      method: "DELETE",
      headers: headers,
    })
      .then((response) => {
        console.log(response.status);

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
