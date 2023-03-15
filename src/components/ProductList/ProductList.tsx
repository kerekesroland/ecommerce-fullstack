import "./ProductList.scss";
import { FC } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Item } from "../../models/Item";

type Props = {
  category: string;
  maxPrice: number;
  sort: string;
};

const ProductList: FC<Props> = ({ category, maxPrice, sort }) => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className="product-list">
      {products?.map((item: Item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
