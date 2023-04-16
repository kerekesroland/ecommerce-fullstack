import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/config";
import CheckBox from "../../../images/Checkbox.svg";
import styles from "./SilverCard.module.scss";
import { UserSubscription } from "../../../stripe/usePremiumStatus";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { emptyCart } from "../../../store/slices/cartSlice";

interface IProps {
  cancelSubscription?: (subscription_key?: string | undefined) => Promise<void>;
  activateSubscription?: (userId: string) => Promise<void>;
  userSubscriptionId: string;
  activate?: boolean;
  userId?: string;
  blocked?: boolean;
  premiumStatus?: UserSubscription;
}

const SilverCard = ({
  activateSubscription,
  cancelSubscription,
  userSubscriptionId,
  activate,
  userId,
  blocked,
  premiumStatus,
}: IProps) => {
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const isBlocked =
    !userSubscriptionId ||
    (premiumStatus !== "silver" && premiumStatus != null);

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
        dispatch(emptyCart());
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
          <h5>Silver Child</h5>
          <div className={styles.price_container}>
            <span className={styles.price}>
              <span>
                <sup>$ </sup>
              </span>
              <span>15</span>
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
          <div className={styles.feature}>
            <img src={CheckBox} alt="checkbox" />

            <div className={styles.feature_text}>
              <span className={styles.highlighted}>Bonus item</span>
              <span> for each order.</span>
            </div>
          </div>
        </div>
        {activate && premiumStatus !== "silver" ? (
          <button
            style={{
              pointerEvents: isBlocked ? "none" : "all",
            }}
            disabled={isBlocked}
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
    </div>
  );
};

export default SilverCard;
