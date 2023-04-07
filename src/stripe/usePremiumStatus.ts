import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import getUserPremiumStatus from "./userPremiumStatus";

export type UserSubscription = "bronze" | "silver" | "gold" | null;

export default function usePremiumStatus(user: User | null) {
  const [premiumStatus, setPremiumStatus] = useState<UserSubscription>(null);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await getUserPremiumStatus());
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}
