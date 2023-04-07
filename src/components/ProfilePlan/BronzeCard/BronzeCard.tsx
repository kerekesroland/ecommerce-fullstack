import CheckBox from "../../../images/Checkbox.svg";
import styles from "./BronzeCard.module.scss";

interface IProps {
  cancelSubscription?: (subscription_key?: string | undefined) => Promise<void>;
  activateSubscription?: (userId: string) => Promise<void>;
  userSubscriptionId: string;
  activate?: boolean;
  userId?: string;
}

const BronzeCard = ({
  activateSubscription,
  cancelSubscription,
  userSubscriptionId,
  activate,
  userId,
}: IProps) => {
  return (
    <div className={styles.card_container}>
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
      {activate ? (
        <button
          onClick={() => activateSubscription?.(userId as string)}
          className={styles.upgrade}
        >
          Upgrade to Plan
        </button>
      ) : (
        <button
          onClick={() => cancelSubscription?.(userSubscriptionId)}
          className={styles.upgrade}
        >
          Cancel Plan
        </button>
      )}
    </div>
  );
};

export default BronzeCard;
