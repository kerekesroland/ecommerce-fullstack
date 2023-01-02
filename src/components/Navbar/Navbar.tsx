import KeyBoardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useState } from "react";
import Cart from "../Cart/Cart";
type Props = {};

const Navbar = (props: Props) => {
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="mobile-item">
            <MenuIcon />
          </div>

          <div className="item">
            <span>EN</span>
            <KeyBoardArrowDownIcon />
          </div>

          <div className="item">
            <Link className="link" to="/products/men">
              Men
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/women">
              Women
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/children">
              Children
            </Link>
          </div>
        </div>

        <div className="center">
          <Link className="link" to="/">
            RIVIERA
          </Link>
        </div>

        <div className="right">
          <div className="item">
            <Link className="link" to="/">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Contact
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Stores
            </Link>
          </div>
          <div className="icons">
            <div className="icon">
              <FavoriteBorderOutlinedIcon />
            </div>
            <div
              className="cart-icon"
              onClick={() => setIsOpenCart(!isOpenCart)}
            >
              <ShoppingCartOutlinedIcon />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
      {isOpenCart && <Cart />}
    </div>
  );
};

export default Navbar;
