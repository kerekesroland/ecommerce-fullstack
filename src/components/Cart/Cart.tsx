import CartItem from "../CartItem/CartItem";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { FC } from "react";
import "./Cart.scss";

type Props = {
  setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart: FC<Props> = ({ setIsOpenCart }) => {
  const cartItems = [
    {
      id: 1,
      image_1: require("../../images/cloth_1-min.jpg"),
      title: "Superset clothes",
      price: 44.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 2,
      image_1: require("../../images/cloth_2-min.jpg"),
      title: "Superset clothes",
      price: 44.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Nike shoes",
    },
  ];
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
      <h1>Items in your Cart</h1>
      <div className="items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <hr className="separator" />
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
      <hr className="separator" />
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
