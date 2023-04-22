import { useEffect, useState } from "react";
import Order from "../Order/Order";
import "./ProfileOrders.scss";
import { getOrders } from "../../stripe/getOrders";
import { User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { toggleLoading } from "../../store/slices/loadingSlice";
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
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const orders = async () => {
      setIsLoading(true);
      if (user) {
        const res = await getOrders(user.uid);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

        setOrders(
          res.data.filter(
            (order: IOrder) =>
              order.description !== "Subscription creation" &&
              order.status === "succeeded"
          )
        );
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
      <div className="orders">
        {orders.map((order) => (
          <div className="profile-orders" key={order.id}>
            <Order order={order} />
            <hr className="profile-order-separator" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileOrders;
