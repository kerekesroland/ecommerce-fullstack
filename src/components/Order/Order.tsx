import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IOrder } from "../ProfileOrders/ProfileOrders";
import "./Order.scss";
import { getInvoice } from "../../stripe/getInvoice";

type IProps = {
  order: IOrder;
};

const Order: FC<IProps> = ({ order }) => {
  const { t } = useTranslation();

  const handleGetInvoice = async () => {
    const res = await getInvoice(order.latest_charge);
    window.open(res, "_blank");
  };

  return (
    <div className="order">
      <div className="order-details">
        <div className="minor-details">
          <p>
            <span>{t("data.order.id")}:</span>{" "}
            <span className="order-id">{order.id}</span>
          </p>
          <p>{order.createdAt}</p>
        </div>
        <div className="price">{order.amount / 100} GBP</div>
      </div>
      <div className="order-buttons">
        <button className="reorder">{t("data.order.reorder")}</button>
        <button onClick={handleGetInvoice} className="cancel">
          {t("data.order.details")}
        </button>
      </div>
    </div>
  );
};

export default Order;
