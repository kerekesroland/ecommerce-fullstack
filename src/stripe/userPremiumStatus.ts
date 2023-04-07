import { auth } from "../firebase/config";
import { UserSubscription } from "./usePremiumStatus";

export default async function getUserPremiumStatus(): Promise<UserSubscription | null> {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();
  return decodedToken?.claims?.stripeRole;
}
