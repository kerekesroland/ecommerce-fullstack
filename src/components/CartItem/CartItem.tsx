import "./CartItem.scss";
import { FC } from "react";
import { ICartItem } from "../../models/ICartItem";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  item: ICartItem;
};

const CartItem: FC<Props> = ({ item }) => {
  return (
    <div className="cart-item">
      <div className="left">
        <div className="img-container">
          <img src={item.image_1} alt={item.title} />
          <span>1</span>
        </div>
      </div>

      <div className="center">
        <h1>{item.title}</h1>
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
      <div className="end">${item.price}</div>
      <DeleteIcon style={{ fill: "#DC143C	" }} className="delete-icon" />
    </div>
  );
};

export default CartItem;
