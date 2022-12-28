import "./Home.scss";
import Slider from "../../components/Slider/Slider";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="home">
      <Slider />
    </div>
  );
};

export default Home;
