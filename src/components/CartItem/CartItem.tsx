import "./CartItem.scss";
import { FC } from "react";
import { ICartItem } from "../../models/ICartItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

type Props = {
  item: ICartItem;
};

const CartItem: FC<Props> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="cart-item">
      <div className="left">
        <div className="img-container">
          <img src={item.image} alt={item.title} />
          <span>{item?.quantity}</span>
        </div>
      </div>

      <div className="center">
        <h1>{item.title}</h1>
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
      <div className="end" onClick={() => dispatch(removeFromCart(item.id))}>
        <span>${item.price}</span>
        <DeleteIcon style={{ fill: "#DC143C	" }} className="delete-icon" />
      </div>
    </div>
  );
};

export default CartItem;
