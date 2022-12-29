import "./ProductList.scss";
import { FC } from "react";
import ItemCard from "../ItemCard/ItemCard";

type Props = {
  category: string;
  maxPrice: number;
  sort: string;
};

const ProductList: FC<Props> = ({ category, maxPrice, sort }) => {
  const DUMMY_DATA = [
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
      title: "Nike shoes for men",
      price: 24.99,
      oldPrice: 22.99,
      isNew: false,
      category: "Men Shoes",
    },
    {
      id: 3,
      image_1: require("../../images/cloth_1.jpg"),
      title: "Superset clothes",
      price: 14.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 4,
      image_1: require("../../images/cloth_2.jpg"),
      title: "Better Nike Shoes",
      price: 104.99,
      oldPrice: 140.99,
      isNew: false,
      category: "Men Shoes",
    },
    {
      id: 5,
      image_1: require("../../images/cloth_1.jpg"),
      title: "Superset clothes",
      price: 14.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 6,
      image_1: require("../../images/cloth_2.jpg"),
      title: "Better Nike Shoes",
      price: 104.99,
      oldPrice: 140.99,
      isNew: false,
      category: "Men Shoes",
    },
    {
      id: 7,
      image_1: require("../../images/cloth_1.jpg"),
      title: "Superset clothes",
      price: 14.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 8,
      image_1: require("../../images/cloth_2.jpg"),
      title: "Better Nike Shoes",
      price: 104.99,
      oldPrice: 140.99,
      isNew: false,
      category: "Men Shoes",
    },
  ];
  return (
    <div className="product-list">
      {DUMMY_DATA.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
