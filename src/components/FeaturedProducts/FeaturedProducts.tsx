import ItemCard from "../ItemCard/ItemCard";
import "./FeaturedProducts.scss";
import { useRef } from "react";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Item } from "../../models/Item";
const FeaturedProducts = () => {
  const { t } = useTranslation();
  const products = useSelector((state: RootState) => state.products.products);

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
        <h1>{t("data.featuredProducts.title")}</h1>
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
        {products?.slice(0, 8).map((item: Item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
