import { useEffect, useState } from "react";
import Order from "../Order/Order";
import styles from "./ProfileOrders.module.scss";
import { getOrders } from "../../stripe/getOrders";
import { User } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import Loader from "../Loader/Loader";

export interface IOrder {
  id: string;
  status: string;
  latest_charge: string;
  amount: number;
  description: string;
  createdAt: string;
}

const ProfileOrders = ({ user }: { user: User | null }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const orders = async () => {
      setIsLoading(true);
      if (user) {
        const res = await getOrders(user.uid);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

        if (res) {
          setOrders(
            res.data.filter(
              (order: IOrder) =>
                order.description !== "Subscription creation" &&
                order.status === "succeeded"
            )
          );
        } else {
          setOrders([]);
        }
      }
    };
    orders();
  }, [user, dispatch]);

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <div className={styles.orders}>
        {orders.length > 0 ? (
          orders?.map((order) => (
            <div className={styles.profile_orders} key={order?.id}>
              <Order order={order} />
              <hr className={styles.profile_order_separator} />
            </div>
          ))
        ) : (
          <div className={styles.no_orders}>
            <h2>No orders found</h2>
            <h3>Try making some payments!</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileOrders;
