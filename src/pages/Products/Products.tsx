import "./Products.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ControllerDropdown } from "../../components/ControllerDropdown/ControllerDropdown";

type SubCategories = {
  title: string;
  subcategory: {
    label: string;
    value: string;
    checked?: boolean;
  }[];
};

const Products = () => {
  const category = useParams().category || "";
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sort, setSort] = useState<string>("");
  const [sizeCategories, setSizeCategories] = useState<SubCategories>({
    title: "Sizes",
    subcategory: [
      { label: "Small", value: "small", checked: false },
      { label: "Medium", value: "medium", checked: false },
      { label: "Large", value: "large", checked: false },
    ],
  });
  const [colorCategories, setColorCategories] = useState<SubCategories>({
    title: "Colors",
    subcategory: [
      { label: "Green", value: "green", checked: false },
      { label: "Blue", value: "blue", checked: false },
      { label: "Black", value: "black", checked: false },
    ],
  });

  const [priceCategories, setPriceCategories] = useState<SubCategories>({
    title: "Prices",
    subcategory: [
      { label: "10-99", value: "10-99", checked: false },
      { label: "100-500", value: "100-500", checked: false },
      { label: "500-2000", value: "500-2000", checked: false },
      { label: "2000-10000", value: "2000-10000", checked: false },
      { label: "10000-50000", value: "10000-50000", checked: false },
    ],
  });

  const selectedSizes = sizeCategories.subcategory
    .filter((element) => element.checked === true)
    .map((el) => el.value);

  const selectedColors = colorCategories.subcategory
    .filter((element) => element.checked === true)
    .map((el) => el.value);

  const selectedPrice = priceCategories.subcategory
    .filter((element) => element.checked === true)
    .map((el) => el.value);

  const filters = [...selectedSizes, ...selectedColors, ...selectedPrice];

  return (
    <div className="products">
      <div className="left">
        <div className="filter-item">
          <h2 style={{ marginBottom: "1rem" }}>Categories</h2>

          <ControllerDropdown
            subCategories={sizeCategories}
            setSubCategories={setSizeCategories}
          />

          <ControllerDropdown
            subCategories={colorCategories}
            setSubCategories={setColorCategories}
          />

          <ControllerDropdown
            subCategories={priceCategories}
            setSubCategories={setPriceCategories}
            singleValue={true}
          />
        </div>

        <div className="filter-item">
          <h2>Sort by</h2>
          <div className="input-item">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={() => setSort("asc")}
            />
            <label htmlFor="asc">Price (lowest to highest)</label>
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={() => setSort("desc")}
            />
            <label htmlFor="desc">Price (highest to lowest)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <ProductList
          category={category}
          filters={filters}
          maxPrice={maxPrice}
          sort={sort}
        />
      </div>
    </div>
  );
};

export default Products;
