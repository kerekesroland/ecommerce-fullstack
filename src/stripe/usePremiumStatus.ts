import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import getUserPremiumStatus from "./userPremiumStatus";

export type UserSubscription = "bronze" | "silver" | "gold" | null;

export default function usePremiumStatus() {
  const [premiumStatus, setPremiumStatus] = useState<UserSubscription>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const fetchPremiumStatus = async () => {
        const status = await getUserPremiumStatus();
        setPremiumStatus(status);
      };
      fetchPremiumStatus();
    } else {
      setPremiumStatus(null);
    }
  }, [user]);

  return premiumStatus;
}
