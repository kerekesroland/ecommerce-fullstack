import "./Categories.scss";
import ImageCard from "../ImageCard/ImageCard";
import { FashionItem } from "../../models/FashionItem";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();
  const images: Array<FashionItem> = [
    {
      id: "men",
      image: require("../../images/men-fashion-min-02.jpg"),
      btnTitle: t("data.navigation.men"),
    },
    {
      id: "women",
      image: require("../../images/women-fashion-min-02.jpg"),
      btnTitle: t("data.navigation.women"),
    },
    {
      id: "children",
      image: require("../../images/children-fashion-min-02.jpg"),
      btnTitle: t("data.navigation.children"),
    },
    {
      id: "accessories",
      image: require("../../images/accesories-min-02.jpg"),
      btnTitle: t("data.navigation.accessories"),
    },
  ];
  return (
    <div className="categories">
      <h1>{t("data.categories.title")}</h1>
      <div className="items">
        {images.map((img) => (
          <ImageCard key={img.id} img={img} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
