import { FC } from "react";
import { Link } from "react-router-dom";
import { Item } from "../../models/Item";
import "./ItemCard.scss";

type Props = {
  item: Item;
};

const ItemCard: FC<Props> = ({ item }) => {
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="img-container">
          <img src={item.image} alt="item" />
        </div>
        <div className="details">
          <span className="name">{item.title}</span>
          <span className="price">${item.price}</span>
        </div>
        <span className="category">{item.category}</span>
      </div>
    </Link>
  );
};

export default ItemCard;
