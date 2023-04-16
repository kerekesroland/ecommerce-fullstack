import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const productsRef = "products";

const getProducts = async () => {
  const productDocs = await getDocs(collection(db, productsRef));
  const products: any = [];
  productDocs.forEach((product) =>
    products.push({
      id: product.id,
      ...product.data(),
    })
  );

  return products.filter((product: any) => !product.id.includes("prod"));
};

export const productsService = {
  getProducts,
};
