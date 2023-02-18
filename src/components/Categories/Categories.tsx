import "./Categories.scss";
import ImageCard from "../ImageCard/ImageCard";
import { FashionItem } from "../../models/FashionItem";

type Props = {};

const Categories = (props: Props) => {
  const images: Array<FashionItem> = [
    {
      id: "men",
      image: require("../../images/men-fashion-min-02.jpg"),
      btnTitle: "Men",
    },
    {
      id: "women",
      image: require("../../images/women-fashion-min-02.jpg"),
      btnTitle: "Women",
    },
    {
      id: "children",
      image: require("../../images/children-fashion-min-02.jpg"),
      btnTitle: "Children",
    },
    {
      id: "accessories",
      image: require("../../images/accesories-min-02.jpg"),
      btnTitle: "Accessories",
    },
  ];
  return (
    <div className="categories">
      //todo add translation
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
