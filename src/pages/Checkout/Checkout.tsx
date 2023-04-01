import { useSelector } from "react-redux";
import InputController from "../../components/InputController/InputController";
import styles from "./Checkout.module.scss";
import { RootState } from "../../store/store";
import { ICartItem } from "../../models/ICartItem";
import CartItem from "../../components/CartItem/CartItem";
import Separator from "../../components/Separator/Separator";
import { useState } from "react";
import RadioController from "../../components/RadioController/RadioController";

type PaymentMethods =
  | "online_payment"
  | "cash_on_delivery"
  | "card_on_delivery";

const Checkout = () => {
  const { cart, cartTotal, cartSubTotal, cartShipping } = useSelector(
    (state: RootState) => state.cart
  );

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethods>("online_payment");

  const handlePaymentMethodChange = (event: any) => {
    setPaymentMethod(event);
  };

  return (
    <div className={styles.checkout}>
      <CheckoutLeftColumn
        paymentMethod={paymentMethod}
        handlePaymentMethodChange={handlePaymentMethodChange}
      />
      <CheckoutRightColumn
        cart={cart}
        cartTotal={cartTotal}
        cartSubTotal={cartSubTotal}
        cartShipping={cartShipping}
      />
    </div>
  );
};

interface IDeliveryInfoProps {
  paymentMethod: string;
  handlePaymentMethodChange: (event: any) => void;
}

const CheckoutLeftColumn = ({
  paymentMethod,
  handlePaymentMethodChange,
}: IDeliveryInfoProps) => (
  <div className={styles.delivery_information}>
    <h4>Delivery Information</h4>
    <div className={styles.delivery_container}>
      <InputController
        name={"Name"}
        register={undefined}
        placeholder={"Roland Kerekes"}
        defaultName={"Name"}
      />
      <InputController
        name={"Mobile number"}
        register={undefined}
        placeholder={"06706240021"}
        defaultName={"Mobile number"}
      />
      <InputController
        name={"Email"}
        register={undefined}
        placeholder={"test@example.com"}
        defaultName={"Email"}
      />
      <InputController
        name={"City"}
        register={undefined}
        placeholder={"Szeged"}
        defaultName={"City"}
      />
      <InputController
        name={"State"}
        register={undefined}
        placeholder={"Csongrad-Csanad"}
        defaultName={"State"}
      />
      <InputController
        name={"Zip"}
        register={undefined}
        placeholder={"6722"}
        defaultName={"Zip"}
      />
      <InputController
        name={"Address"}
        register={undefined}
        placeholder={"Test street 28/B"}
        defaultName={"Address"}
      />
    </div>
    <h4 className={styles.payment_title}>Payment method</h4>
    <div className={styles.payment_container}>
      <RadioController
        label="Online payment"
        value="online_payment"
        onChange={() => handlePaymentMethodChange("online_payment")}
        checked={paymentMethod === "online_payment"}
      />
      <RadioController
        label="Cash on delivery"
        value="cash_on_delivery"
        onChange={() => handlePaymentMethodChange("cash_on_delivery")}
        checked={paymentMethod === "cash_on_delivery"}
      />
      <RadioController
        label="Card on delivery"
        value="card_on_delivery"
        onChange={() => handlePaymentMethodChange("card_on_delivery")}
        checked={paymentMethod === "card_on_delivery"}
      />
    </div>
  </div>
);

const CheckoutRightColumn = ({
  cart,
  cartSubTotal,
  cartShipping,
  cartTotal,
}: {
  cart: ICartItem[];
  cartSubTotal: number;
  cartShipping: number;
  cartTotal: number;
}) => (
  <div className={styles.order_summary}>
    <h4>Order Summary</h4>
    <div className={styles.order_container}>
      <div className={styles.order_item}>
        {cart?.map((cartItem: ICartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <Separator maxWidth />
      <div className={styles.order_details}>
        <div className={styles.subtotal}>
          <div className={styles.item}>
            <span className={styles.title}>Subtotal</span>
            <span className={styles.value}>${cartSubTotal.toFixed(2)}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.title}>Shipping</span>
            <span className={styles.value}>${cartShipping.toFixed(2)}</span>
          </div>
        </div>
        <Separator />
        <div className={styles.total}>
          <span className={styles.title}>Total</span>
          <span className={styles.value}>${cartTotal.toFixed(2)}</span>
        </div>
        <div className={styles.btn_container}>
          <button>Confirm Order</button>
        </div>
      </div>
    </div>
  </div>
);

export default Checkout;
