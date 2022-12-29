import "./Products.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const Products = (props: Props) => {
  const category = useParams().category || "";
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sort, setSort] = useState<string>("");

  return (
    <div className="products">
      <div className="left">
        <div className="filter-item">
          <h2>Categories</h2>
          <div className="input-item">
            <input type="checkbox" id="shoes" value={1} />
            <label htmlFor="shoes">Shoes</label>
          </div>
          <div className="input-item">
            <input type="checkbox" id="hats" value={2} />
            <label htmlFor="hats">Hats</label>
          </div>
          <div className="input-item">
            <input type="checkbox" id="jackets" value={3} />
            <label htmlFor="jackets">Jackets</label>
          </div>
        </div>
        <div className="filter-item">
          <h2>Price</h2>
          <div className="input-item">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(+e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filter-item">
          <h2>Sort by</h2>
          <div className="input-item">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (lowest to highest)</label>
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (highest to lowest)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <ProductList category={category} maxPrice={maxPrice} sort={sort} />
      </div>
    </div>
  );
};

export default Products;
