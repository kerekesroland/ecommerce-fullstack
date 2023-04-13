import { toast } from "react-toastify";
import CheckBox from "../../../images/Checkbox.svg";
import styles from "./BronzeCard.module.scss";
import { useState } from "react";
import { auth } from "../../../firebase/config";
import { UserSubscription } from "../../../stripe/usePremiumStatus";

interface IProps {
  cancelSubscription?: (subscription_key?: string | undefined) => Promise<void>;
  activateSubscription?: (userId: string) => Promise<void>;
  userSubscriptionId: string;
  activate?: boolean;
  userId?: string;
  blocked?: boolean;
  premiumStatus?: UserSubscription;
}

const BronzeCard = ({
  activateSubscription,
  cancelSubscription,
  userSubscriptionId,
  activate,
  blocked,
  userId,
  premiumStatus,
}: IProps) => {
  const [success, setSuccess] = useState<boolean>(false);
  const isBlocked =
    !userSubscriptionId ||
    (premiumStatus !== "bronze" && premiumStatus != null);

  const handleCancelation = async () => {
    try {
      await cancelSubscription?.(userSubscriptionId).then(() => {
        toast.success("Successful cancelation!", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
        setSuccess(true);
      });
    } catch (error) {
      toast.error("There was an error during cancelation", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        closeOnClick: true,
      });
      setSuccess(false);
    }
  };

  const handleActivateSubscription = async () => {
    try {
      if (!auth.currentUser?.uid) return;
      await activateSubscription?.(auth?.currentUser?.uid as string);
    } catch (error) {
      toast.error("There was an error during subscription", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        closeOnClick: true,
      });
      setSuccess(false);
    }
  };

  return (
    <div
      className={styles.card_container}
      style={{
        opacity: isBlocked ? 0.6 : 1,
      }}
    >
      <div className={styles.badge} />
      <div className={styles.profile_plan_details}>
        <div>
          <h5>Bronze Child</h5>
          <div className={styles.price_container}>
            <span className={styles.price}>
              <span>
                <sup>$ </sup>
              </span>
              <span>5</span>
            </span>
            <span className={styles.month}> / month</span>
          </div>
        </div>
        <div className={styles.features}>
          <div className={styles.features_title}>Features included:</div>
          <div className={styles.feature}>
            <img src={CheckBox} alt="checkbox" />
            <div className={styles.feature_text}>
              <span className={styles.highlighted}>Free delivery </span>
              <span>for every order.</span>
            </div>
          </div>
        </div>
      </div>
      {activate && premiumStatus !== "bronze" ? (
        <button
          disabled={isBlocked}
          style={{
            pointerEvents: isBlocked ? "none" : "all",
          }}
          onClick={handleActivateSubscription}
          className={styles.upgrade}
        >
          Upgrade to Plan
        </button>
      ) : (
        <button onClick={handleCancelation} className={styles.upgrade}>
          Cancel Plan
        </button>
      )}
    </div>
  );
};

export default BronzeCard;
