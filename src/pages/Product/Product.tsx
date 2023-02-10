import "./Product.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import product1 from "../../images/cloth_1-min.jpg";
import product2 from "../../images/cloth_2-min.jpg";
import { useState } from "react";

const Product = () => {
  const [currentImage, setCurrentImage] = useState<string>(product1);

  const previews = [
    { id: 1, src: product1 },

    { id: 2, src: product2 },

    { id: 3, src: product1 },

    { id: 4, src: product2 },
  ];
  const [amount, setAmount] = useState<number>(1);

  const onAddAmount = () => {
    if (amount === 10) return;
    setAmount((prev) => prev + 1);
  };

  const onSubtractAmount = () => {
    if (amount === 1) return;
    setAmount((prev) => prev - 1);
  };

  return (
    <div className="product">
      <div className="left">
        <img className="product-img" src={currentImage} alt="" />
        <div className="preview-images">
          {previews.map((src) => (
            <div
              key={src.id}
              className="image-container"
              onClick={() => setCurrentImage(src.src)}
            >
              <img src={src.src} alt="preview" />
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <h1>Nike Shoes for Men</h1>
        <div className="details">
          <div className="brand">
            <span className="title">Brand:</span>
            <span className="value">Nike</span>
          </div>
          <div className="info-container">
            <span className="title">Condition:</span>
            <span className="value">New</span>
          </div>
          <div className="info-container">
            <span className="title">Stock:</span>
            <span className="value">900</span>
          </div>
          <div className="info-container">
            <span className="title">Category:</span>
            <span className="value">Shoe</span>
          </div>
          <div className="info-container">
            <span className="title">Heavy:</span>
            <span className="value">1 Kg</span>
          </div>
        </div>
        <div className="buy-container">
          <div className="price">$ 59.99</div>
          <div className="amount">
            <div className="icons">
              <div className="icon" onClick={onSubtractAmount}>
                <RemoveIcon style={{ fill: "#303030" }} />
              </div>
              <span className="number">{amount}</span>
              <div className="icon" onClick={onAddAmount}>
                <AddIcon style={{ fill: "#303030" }} />
              </div>
            </div>
            <div className="btn-container">
              <AddShoppingCartIcon style={{ fill: "#fff" }} />
              <span className="buy">Add to Cart</span>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="description">
          <h1>Description</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A omnis
            itaque soluta suscipit non ipsa perspiciatis illo earum aliquid
            rerum sit asperiores aut laboriosam officiis rem cumque distinctio
            labore, explicabo perferendis accusamus iure molestias quas!
            Explicabo odio eveniet sit exercitationem aperiam repellat nesciunt
            natus dolore, totam ipsam velit! Quis, porro?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
