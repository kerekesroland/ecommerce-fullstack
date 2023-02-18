import Order from "../Order/Order";
import "./ProfileOrders.scss";

export interface IOrder {
  id: string;
  price: number;
  date: string;
}

const orders: Array<IOrder> = [
  {
    id: "54we634",
    price: 310,
    date: "02.07.2023 - 09:19",
  },
  {
    id: "e312332",
    price: 185,
    date: "01.05.2022 - 14:19",
  },
  {
    id: "94e7h23",
    price: 550,
    date: "01.22.2023 - 16:14",
  },
];

const ProfileOrders = () => {
  return (
    <div className="orders">
      {orders.map((order) => (
        <div className="profile-orders" key={order.id}>
          <Order order={order} />
          <hr className="profile-order-separator" />
        </div>
      ))}
    </div>
  );
};

export default ProfileOrders;
