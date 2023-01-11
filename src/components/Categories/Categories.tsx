import "./Categories.scss";
import ImageCard from "../ImageCard/ImageCard";
import { FashionItem } from "../../models/FashionItem";

type Props = {};

const Categories = (props: Props) => {
  const images: Array<FashionItem> = [
    {
      id: "men",
      image: require("../../images/men-fashion-min.jpg"),
      btnTitle: "Men",
    },
    {
      id: "women",
      image: require("../../images/women-fashion-min.jpg"),
      btnTitle: "Women",
    },
    {
      id: "children",
      image: require("../../images/children-fashion-min.jpg"),
      btnTitle: "Children",
    },
    {
      id: "accessories",
      image: require("../../images/accesories-min.jpg"),
      btnTitle: "Accessories",
    },
  ];
  return (
    <div className="categories">
      <h1>Categories</h1>
      <div className="items">
        {images.map((img) => (
          <ImageCard key={img.id} img={img} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
