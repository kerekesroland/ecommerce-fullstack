import CheckBox from "../../../images/Checkbox.svg";
import styles from "./GoldCard.module.scss";

interface IProps {
  cancelSubscription?: (subscription_key?: string | undefined) => Promise<void>;
  activateSubscription?: (userId: string) => Promise<void>;
  userSubscriptionId: string;
  activate?: boolean;
  userId?: string;
}

const GoldCard = ({
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
          <h5>Gold Child</h5>
          <div className={styles.price_container}>
            <span className={styles.price}>
              <span>
                <sup>$ </sup>
              </span>
              <span>25</span>
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
          <div className={styles.feature}>
            <img src={CheckBox} alt="checkbox" />

            <div className={styles.feature_text}>
              <span className={styles.highlighted}>Chosen item </span>
              <span>at the end of month.</span>
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
    </div>
  );
};

export default GoldCard;
