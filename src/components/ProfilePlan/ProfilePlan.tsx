import "./ProfilePlan.scss";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import { auth } from "../../firebase/config";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import cancelSubscription from "../../stripe/cancelSubscription";
import getSubscriptionId from "../../stripe/getSubscriptionId";
import GoldCard from "./GoldCard/GoldCard";
import SilverCard from "./SilverCard/SilverCard";
import BronzeCard from "./BronzeCard/BronzeCard";
import { Link } from "react-router-dom";
import LinkButton from "../LinkButton/LinkButton";

const ProfilePlan = () => {
  const currUser: any = auth?.currentUser;
  const premiumStatus = usePremiumStatus(currUser);
  const [userSubscriptionId, setUserSubscriptionId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  if (loading) {
    return (
      <div className="signatureLoader">
        <Loader />
      </div>
    );
  }

  //Make a function that differentiates between tiers

  return (
    <div className="profile-plan">
      {premiumStatus === "gold" && (
        <GoldCard
          userSubscriptionId={userSubscriptionId}
          cancelSubscription={cancelSubscription}
        />
      )}
      {premiumStatus === "silver" && (
        <SilverCard
          userSubscriptionId={userSubscriptionId}
          cancelSubscription={cancelSubscription}
        />
      )}
      {premiumStatus === "bronze" && (
        <BronzeCard
          userSubscriptionId={userSubscriptionId}
          cancelSubscription={cancelSubscription}
        />
      )}
      {premiumStatus === null && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2 style={{ padding: "1rem 0rem" }}>
            Currently you have no subscriptions!
          </h2>
          <Link to="/plans">
            <LinkButton title="Choose plan!" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePlan;
