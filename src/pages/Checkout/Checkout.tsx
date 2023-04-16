import { useDispatch, useSelector } from "react-redux";
import InputController from "../../components/InputController/InputController";
import styles from "./Checkout.module.scss";
import { AppDispatch, RootState } from "../../store/store";
import { ICartItem } from "../../models/ICartItem";
import CartItem from "../../components/CartItem/CartItem";
import Separator from "../../components/Separator/Separator";
import { useEffect, useState } from "react";
import RadioController from "../../components/RadioController/RadioController";
import { SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthSchemas } from "../../hooks/useAuthSchemas";
import { auth } from "../../firebase/config";
import { handlePaymentWithCreditCard } from "../../stripe/createCheckoutSession";
import usePremiumStatus, {
  UserSubscription,
} from "../../stripe/usePremiumStatus";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IProduct } from "../../models/IProduct";
import { addToCart, emptyCart } from "../../store/slices/cartSlice";

type PaymentMethods =
  | "online_payment"
  | "cash_on_delivery"
  | "card_on_delivery";

export interface CheckoutProps {
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  zip: string;
  address: string;
}

const Checkout = () => {
  const { cart, cartTotal, cartSubTotal, cartShipping } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  const currentUserId = auth?.currentUser;
  const premiumStatus = usePremiumStatus(currentUserId);
  const [giftedProduct, setGiftedProduct] = useState<ICartItem | null>(null);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const items = Boolean(
      cart.every((item: ICartItem) => item.id.includes("BONUS"))
    );
    if (cart.length === 0 || (cart.length > 0 && items)) {
      navigate("/");
      dispatch(emptyCart());
    }
  }, [cart, navigate, dispatch]);

  useEffect(() => {
    //Get a random bonus product for each order if you are silver or above
    const getRandomizedProduct = () => {
      if (premiumStatus === "silver" || premiumStatus === "gold") {
        const ids = products.map((product: IProduct) => product.id);
        const randomPick = ids[Math.floor(Math.random() * ids.length)];

        if (randomPick && giftedProduct === null) {
          const gift = products.find(
            (product: IProduct) => product.id === randomPick
          );
          setGiftedProduct({
            ...gift,
            price: 0,
            quantity: 1,
            gift: true,
            id: gift.id.concat("BONUS"),
          });
        }
      }
    };
    getRandomizedProduct();
  }, [cart, giftedProduct, premiumStatus, products]);

  useEffect(() => {
    const alreadyHasBonusItem = Boolean(
      cart.find((item: any) => item.id.includes("BONUS"))
    );

    if (giftedProduct && !alreadyHasBonusItem) {
      dispatch(addToCart(giftedProduct));
    }
    // dispatch(emptyCart());
  }, [cart, dispatch, giftedProduct]);

  const { checkoutFormSchema } = useAuthSchemas();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<CheckoutProps>({
    resolver: yupResolver(checkoutFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CheckoutProps> = async (data) => {
    const dataWithPayment = { ...data, payment_method: paymentMethod };
    await handlePaymentWithCreditCard(
      auth?.currentUser?.uid as string,
      cart,
      premiumStatus ? 0 : cartShipping,
      dataWithPayment
    );
  };

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethods>("online_payment");

  const handlePaymentMethodChange = (event: any) => {
    setPaymentMethod(event);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.checkout}>
      <CheckoutLeftColumn
        paymentMethod={paymentMethod}
        handlePaymentMethodChange={handlePaymentMethodChange}
        register={register}
      />
      <CheckoutRightColumn
        premiumStatus={premiumStatus}
        cart={cart}
        cartTotal={cartTotal}
        cartSubTotal={cartSubTotal}
        cartShipping={cartShipping}
      />
    </form>
  );
};

interface IDeliveryInfoProps {
  paymentMethod: string;
  handlePaymentMethodChange: (event: any) => void;
  register: UseFormRegister<CheckoutProps>;
}

const CheckoutLeftColumn = ({
  paymentMethod,
  handlePaymentMethodChange,
  register,
}: IDeliveryInfoProps) => (
  <div className={styles.delivery_information}>
    <h4>Delivery Information</h4>
    <div className={styles.delivery_container}>
      <InputController
        name={"Name"}
        register={register("name")}
        placeholder={"Roland Kerekes"}
        defaultName={"Name"}
      />
      <InputController
        name={"Mobile number"}
        register={register("mobile")}
        placeholder={"06706240021"}
        defaultName={"Mobile number"}
      />
      <InputController
        name={"Email"}
        register={register("email")}
        placeholder={"test@example.com"}
        defaultName={"Email"}
      />
      <InputController
        name={"City"}
        register={register("city")}
        placeholder={"Szeged"}
        defaultName={"City"}
      />
      <InputController
        name={"State"}
        register={register("state")}
        placeholder={"Csongrad-Csanad"}
        defaultName={"State"}
      />
      <InputController
        name={"Zip"}
        register={register("zip")}
        placeholder={"6722"}
        defaultName={"Zip"}
      />
      <InputController
        name={"Address"}
        register={register("address")}
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
  premiumStatus,
}: {
  cart: ICartItem[];
  cartSubTotal: number;
  cartShipping: number;
  cartTotal: number;
  premiumStatus?: UserSubscription;
  giftedProduct?: ICartItem | null;
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
          {premiumStatus && (
            <div className={styles.item}>
              <span className={styles.title}>
                {premiumStatus.toUpperCase()}
              </span>
              <span className={styles.value}>-${cartShipping.toFixed(2)}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className={styles.total}>
          <span className={styles.title}>Total</span>
          <span className={styles.value}>
            {premiumStatus
              ? (cartTotal - cartShipping).toFixed(2)
              : cartTotal.toFixed(2)}
          </span>
        </div>
        <div className={styles.btn_container}>
          <button type="submit">Confirm Order</button>
        </div>
      </div>
    </div>
  </div>
);

export default Checkout;
