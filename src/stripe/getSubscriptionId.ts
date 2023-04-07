import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default async function getSubscriptionId(
  userId: string
): Promise<string> {
  try {
    const subscriptionsRef = collection(db, "users", userId, "subscriptions");
    const q = query(subscriptionsRef);

    const querySnapshot = await getDocs(q);

    const subscriptions = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      status: doc.data?.status,
      ...doc.data(),
    }));

    const activeSubscription = subscriptions.filter(
      (subscription) => subscription.status !== "canceled"
    )[0];

    return activeSubscription.id;
  } catch (error) {
    return "null";
  }
}
