import "./ProductList.scss";
import { FC } from "react";
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

  const filteredProducts = products.filter(
    (product) =>
      product.main_category.toLowerCase() === category &&
      filters.every((filter) => product.category.includes(filter))
  );

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
            <ItemCard key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductList;
