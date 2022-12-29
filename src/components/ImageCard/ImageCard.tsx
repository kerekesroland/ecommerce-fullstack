import "./ImageCard.scss";
import { FC } from "react";
import { FashionItem } from "../../models/FashionItem";
import { Link } from "react-router-dom";
type Props = {
  img: FashionItem;
};

const ImageCard: FC<Props> = ({ img }) => {
  return (
    <Link to={`/products/${img.id}`}>
      <div className="image-card">
        <div className="img-container">
          <img src={img.image} alt="" />
          <div className="btn-container">
            <button>{img.btnTitle}</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
