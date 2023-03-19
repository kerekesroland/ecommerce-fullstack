import CartItem from "../CartItem/CartItem";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { FC } from "react";
import "./Cart.scss";
import Separator from "../Separator/Separator";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ICartItem } from "../../models/ICartItem";
import EmptyCart from "../../images/emptyCart.svg";

type Props = {
  setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart: FC<Props> = ({ setIsOpenCart }) => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  if (!cart.length) {
    return (
      <motion.div
        key="modal"
        initial={{ right: "-50rem" }}
        animate={{
          right: "1.875rem",
        }}
        transition={{
          duration: 0.6,
        }}
        exit={{ right: "-50rem" }}
        className="cart"
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
          className="cart-items"
        >
          Your cart is empty
        </h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: "35%",
              height: "35%",
              objectFit: "cover",
              fill: "#505050",
              textAlign: "center",
            }}
            src={EmptyCart}
            alt="empty cart"
          />
        </div>
        <div className="close-container" onClick={() => setIsOpenCart(false)}>
          <CloseIcon className="close-icon" style={{ fill: "crimson" }} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="modal"
      initial={{ right: "-50rem" }}
      animate={{
        right: "1.875rem",
      }}
      transition={{
        duration: 0.6,
      }}
      exit={{ right: "-50rem" }}
      className="cart"
    >
      <h1 className="cart-items">Items in your Cart</h1>
      <div className="items">
        {cart.map((item: ICartItem) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Separator />
      <div className="subtotal">
        <div className="item">
          <span className="title">Subtotal</span>
          <span className="value">$66.99</span>
        </div>
        <div className="item">
          <span className="title">Shipping</span>
          <span className="value">$8.99</span>
        </div>
      </div>
      <Separator />
      <div className="total">
        <span className="title">Total</span>
        <span className="value">$318</span>
      </div>
      <div className="btn-container">
        <button>Proceed to Checkout</button>
      </div>
      <div className="close-container" onClick={() => setIsOpenCart(false)}>
        <CloseIcon className="close-icon" style={{ fill: "crimson" }} />
      </div>
    </motion.div>
  );
};

export default Cart;
