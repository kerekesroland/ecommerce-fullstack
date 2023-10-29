import "./ProductList.scss";
import { FC, useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Item } from "../../models/Item";
import { IProduct } from "../../models/IProduct";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  category: string;
  maxPrice: number;
  sort: string;
  filters: Array<string>;
};

const ProductList: FC<Props> = ({ category, maxPrice, sort, filters }) => {
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products.products
  );
  const [filteredProducts, setFilteredProducts] =
    useState<Array<IProduct>>(products);

  useEffect(() => {
    if (filters.length !== 0) {
      // If sort is from lowest to highest
      if (sort === "desc") {
        setFilteredProducts(
          products
            .sort((a, b) => b.price - a.price)
            .filter(
              (product) =>
                product.main_category.toLowerCase() === category &&
                filters.some((filter) => product.category.includes(filter))
            )
        );
      } else {
        setFilteredProducts(
          products
            .sort((a, b) => a.price - b.price)
            .filter(
              (product) =>
                product.main_category.toLowerCase() === category &&
                filters.some((filter) => product.category.includes(filter))
            )
        );
      }
    } else {
      if (sort === "desc") {
        setFilteredProducts(
          products
            .filter(
              (product) => product.main_category.toLowerCase() === category
            )
            .sort((a, b) => b.price - a.price)
        );
      } else {
        setFilteredProducts(
          products
            .filter(
              (product) => product.main_category.toLowerCase() === category
            )
            .sort((a, b) => a.price - b.price)
        );
      }
    }
  }, [category, filters, products, sort]);

  return (
    <motion.div layout className="product-list">
      <AnimatePresence>
        {filteredProducts?.map((item: Item) => (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            layout
            key={item.id}
            className="product-list"
          >
            <ItemCard key={item?.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductList;
