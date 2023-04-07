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

const Plans = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userSubscriptionId, setUserSubscriptionId] = useState<string>("");

  useEffect(() => {
    const getUserSubscription = async () => {
      if (!auth.currentUser) return;
      const subscriptionId: string = await getSubscriptionId(
        auth?.currentUser?.uid
      );
      setUserSubscriptionId(subscriptionId);
    };
    getUserSubscription();
  }, []);

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
  return (
    <div className={styles.plans}>
      <BronzeCard
        activateSubscription={handleBronzeSubscription}
        cancelSubscription={cancelSubscription}
        userSubscriptionId={userSubscriptionId}
        activate={true}
        userId={auth?.currentUser?.uid}
      />
      <SilverCard
        activateSubscription={handleSilverSubscription}
        cancelSubscription={cancelSubscription}
        userSubscriptionId={userSubscriptionId}
        activate={true}
        userId={auth?.currentUser?.uid}
      />
      <GoldCard
        activateSubscription={handleGoldSubscription}
        cancelSubscription={cancelSubscription}
        userSubscriptionId={userSubscriptionId}
        activate={true}
        userId={auth?.currentUser?.uid}
      />
    </div>
  );
};

export default Plans;
