import "./Categories.scss";
import menFashion from "../../images/men-fashion.jpg";
import womenFashion from "../../images/women-fashion.jpg";
import accessories from "../../images/accesories.jpg";
import childrenFashion from "../../images/children-fashion.jpg";
import ImageCard from "../ImageCard/ImageCard";
import { FashionItem } from "../../models/FashionItem";

type Props = {};

const Categories = (props: Props) => {
  const images: Array<FashionItem> = [
    {
      id: "men",
      image: menFashion,
      btnTitle: "Men",
    },
    {
      id: "women",
      image: womenFashion,
      btnTitle: "Women",
    },
    {
      id: "children",
      image: childrenFashion,
      btnTitle: "Children",
    },
    {
      id: "accessories",
      image: accessories,
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
