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
};

const ProductList: FC<Props> = ({ category, maxPrice, sort }) => {
  const products: IProduct[] = useSelector(
    (state: RootState) => state.products.products
  );

  const productsMainCategoryFiltered = products.filter(
    (product) => product.main_category.toLowerCase() === category
  );

  console.log("====================================");
  console.log(productsMainCategoryFiltered);
  console.log("====================================");

  return (
    <motion.div layout className="product-list">
      <AnimatePresence>
        {productsMainCategoryFiltered?.map((item: Item) => (
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
