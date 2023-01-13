import "./Home.scss";
import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Categories from "../../components/Categories/Categories";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts />
      <Categories />
    </div>
  );
};

export default Home;
