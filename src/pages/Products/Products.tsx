import "./Products.scss";

type Props = {};

const Products = (props: Props) => {
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
          <span>0</span>
          <input type="range" min={0} max={10000} />
          <span>10000</span>
        </div>
        <div className="filter-item">
          <h2>Sort by</h2>
          <input type="radio" id="asc" value="asc" name="price" />
          <label htmlFor="asc">Price (lowest to highest)</label>
          <input type="radio" id="desc" value="desc" name="price" />
          <label htmlFor="desc">Price (highest to lowest)</label>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Products;
