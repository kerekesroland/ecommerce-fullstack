import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../ProfileOrders/ProfileOrders";
import "./Order.scss";

type IProps = {
  order: IOrder;
};

const Order: FC<IProps> = ({ order }) => {
  const { t } = useTranslation();

  return (
    <div className="order">
      <div className="order-details">
        <div className="minor-details">
          <p>
            <span>{t("data.order.id")}:</span>{" "}
            <span className="order-id">{order.id}</span>
          </p>
          <p>{order.date}</p>
        </div>
        <div className="price">{order.price} GBP</div>
      </div>
      <div className="order-buttons">
        <button className="reorder">{t("data.order.reorder")}</button>
        <button className="cancel">{t("data.order.details")}</button>
      </div>
    </div>
  );
};

export default Order;
