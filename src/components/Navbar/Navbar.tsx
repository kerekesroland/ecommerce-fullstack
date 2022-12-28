import KeyBoardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./Navbar.scss";
type Props = {};

const Navbar = (props: Props) => {
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
            <Link className="link" to="/products/Men">
              Men
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/Women">
              Women
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/Children">
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
            <div className="cart-icon">
              <ShoppingCartOutlinedIcon />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
