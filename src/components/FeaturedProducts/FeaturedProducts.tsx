import ItemCard from "../ItemCard/ItemCard";
import "./FeaturedProducts.scss";
import { useRef } from "react";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
const FeaturedProducts = () => {
  const DUMMY_DATA = [
    {
      id: 1,
      image_1: require("../../images/cloth_1-min-02.jpg"),
      title: "Superset clothes",
      price: 44.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 2,
      image_1: require("../../images/cloth_2-min-02.jpg"),
      title: "Nike shoes for men",
      price: 24.99,
      oldPrice: 22.99,
      isNew: false,
      category: "Men Shoes",
    },
    {
      id: 3,
      image_1: require("../../images/cloth_1-min-02.jpg"),
      title: "Superset clothes",
      price: 14.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 4,
      image_1: require("../../images/cloth_2-min-02.jpg"),
      title: "Better Nike Shoes",
      price: 104.99,
      oldPrice: 140.99,
      isNew: false,
      category: "Men Shoes",
    },
    {
      id: 5,
      image_1: require("../../images/cloth_1-min-02.jpg"),
      title: "Superset clothes",
      price: 14.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 6,
      image_1: require("../../images/cloth_2-min-02.jpg"),
      title: "Better Nike Shoes",
      price: 104.99,
      oldPrice: 140.99,
      isNew: false,
      category: "Men Shoes",
    },
    {
      id: 7,
      image_1: require("../../images/cloth_1-min-02.jpg"),
      title: "Superset clothes",
      price: 14.99,
      oldPrice: 22.99,
      isNew: true,
      category: "Clothes set",
    },
    {
      id: 8,
      image_1: require("../../images/cloth_2-min-02.jpg"),
      title: "Better Nike Shoes",
      price: 104.99,
      oldPrice: 140.99,
      isNew: false,
      category: "Men Shoes",
    },
  ];

  const scrollRef: any = useRef(null);

  const goToNext = () => {
    scrollRef.current.scrollLeft += 304;
  };

  const goToPrevious = () => {
    scrollRef.current.scrollLeft -= 304;
  };

  return (
    <div className="featured">
      <div className="top">
        <h1>Featured Products</h1>
        <div className="nav-buttons">
          <div className="prev-btn" onClick={goToPrevious}>
            <div className="prev">
              <ChevronLeftOutlined fontSize="large" />
            </div>
          </div>
          <div className="next-btn" onClick={goToNext}>
            <div className="next">
              <ChevronRightOutlined fontSize="large" />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom" ref={scrollRef}>
        {DUMMY_DATA.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
