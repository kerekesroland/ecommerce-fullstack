import CartItem from "../CartItem/CartItem";
import "./Cart.scss";
import { motion } from "framer-motion";

type Props = {};

const Cart = (props: Props) => {
  const cartItems = [
    {
      id: 1,
      image_1: require("../../images/cloth_1.jpg"),
      title: "Superset clothes",
      price: 44.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 2,
      image_1: require("../../images/cloth_2.jpg"),
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
        right: "0.625rem",
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
    </motion.div>
  );
};

export default Cart;
