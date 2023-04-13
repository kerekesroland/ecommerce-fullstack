import "./ProfilePlan.scss";
import cancelSubscription from "../../stripe/cancelSubscription";
import GoldCard from "./GoldCard/GoldCard";
import SilverCard from "./SilverCard/SilverCard";
import BronzeCard from "./BronzeCard/BronzeCard";
import { Link } from "react-router-dom";
import LinkButton from "../LinkButton/LinkButton";
import { UserSubscription } from "../../stripe/usePremiumStatus";

const ProfilePlan = ({
  userSubscriptionId,
  premiumStatus,
}: {
  userSubscriptionId: string;
  premiumStatus: UserSubscription;
}) => {
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
      {premiumStatus === undefined ||
        (premiumStatus === null && (
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
        ))}
    </div>
  );
};

export default ProfilePlan;
