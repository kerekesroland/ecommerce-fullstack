import { useEffect, useState } from "react";
import BronzeCard from "../../components/ProfilePlan/BronzeCard/BronzeCard";
import GoldCard from "../../components/ProfilePlan/GoldCard/GoldCard";
import SilverCard from "../../components/ProfilePlan/SilverCard/SilverCard";
import {
  createPremiumBronzeSession,
  createPremiumSilverSession,
  createPremiumGoldSession,
} from "../../stripe/createCheckoutSession";
import styles from "./Plans.module.scss";
import { auth } from "../../firebase/config";
import Loader from "../../components/Loader/Loader";
import cancelSubscription from "../../stripe/cancelSubscription";
import getSubscriptionId from "../../stripe/getSubscriptionId";
import { UserSubscription } from "../../stripe/usePremiumStatus";
import getUserPremiumStatus from "../../stripe/userPremiumStatus";

const Plans = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userSubscriptionId, setUserSubscriptionId] = useState<string>("");
  const [premiumStatus, setPremiumStatus] = useState<UserSubscription>(null);
  const getUserSubscription = async (uid: string) => {
    const res = await getSubscriptionId(uid);
    return res;
  };

  const getStatus = async () => {
    const res = await getUserPremiumStatus();
    return res;
  };

  useEffect(() => {
    const unsubscribe = async () => {
      setLoading(true);
      const unSub = auth.onAuthStateChanged(async (user) => {
        if (user !== null) {
          const [subscriptionId, status] = await Promise.all([
            getUserSubscription(user.uid),
            getStatus(),
          ]);
          setUserSubscriptionId(subscriptionId);
          setPremiumStatus(status);
          setLoading(false);
        } else {
          setUserSubscriptionId("");
          setPremiumStatus(null);
          setLoading(true);
        }
      });

      return () => {
        unSub();
      };
    };
    unsubscribe();
  }, [userSubscriptionId]);

  const handleBronzeSubscription = async (userId: string) => {
    await createPremiumBronzeSession(userId);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    setLoading(false);
  };
  const handleSilverSubscription = async (userId: string) => {
    await createPremiumSilverSession(userId);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    setLoading(false);
  };
  const handleGoldSubscription = async (userId: string) => {
    await createPremiumGoldSession(userId);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="signatureLoader">
        <Loader />
      </div>
    );
  }
  console.log({ userSubscriptionId }, { premiumStatus });
  return (
    <div className={styles.plans}>
      <BronzeCard
        activateSubscription={handleBronzeSubscription}
        cancelSubscription={cancelSubscription}
        userSubscriptionId={userSubscriptionId}
        activate={true}
        userId={auth?.currentUser?.uid}
        blocked={
          userSubscriptionId &&
          premiumStatus !== null &&
          premiumStatus !== "bronze"
            ? true
            : false
        }
        premiumStatus={premiumStatus}
      />
      <SilverCard
        activateSubscription={handleSilverSubscription}
        cancelSubscription={cancelSubscription}
        userSubscriptionId={userSubscriptionId}
        activate={true}
        userId={auth?.currentUser?.uid}
        blocked={
          userSubscriptionId &&
          premiumStatus !== null &&
          premiumStatus !== "silver"
            ? true
            : false
        }
        premiumStatus={premiumStatus}
      />
      <GoldCard
        activateSubscription={handleGoldSubscription}
        cancelSubscription={cancelSubscription}
        userSubscriptionId={userSubscriptionId}
        activate={true}
        userId={auth?.currentUser?.uid}
        blocked={
          userSubscriptionId &&
          premiumStatus !== null &&
          premiumStatus !== "gold"
            ? true
            : false
        }
        premiumStatus={premiumStatus}
      />
    </div>
  );
};

export default Plans;
