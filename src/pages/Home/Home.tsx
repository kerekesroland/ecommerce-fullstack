import "./Home.scss";
import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Categories from "../../components/Categories/Categories";
import { getProducts } from "../../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
      console.log("Product get called");
    }
  }, [dispatch, products.length]);

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <div className="home">
        <Slider />
        <FeaturedProducts />
        <Categories />
      </div>
    </>
  );
};

export default Home;
