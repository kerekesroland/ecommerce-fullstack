import KeyBoardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import InfoIcon from "@mui/icons-material/Info";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import { AnimatePresence, motion } from "framer-motion";
type Props = {};

const Navbar = (props: Props) => {
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isOpenMobile ? "hidden" : "auto";
    }
  }, [isOpenMobile]);

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="wrapper">
          <div className="left">
            <div
              className="mobile-item"
              onClick={() => setIsOpenMobile(!isOpenMobile)}
            >
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
        <AnimatePresence>{isOpenCart && <Cart />}</AnimatePresence>
        <AnimatePresence>
          {isOpenMobile ? (
            <>
              <motion.div
                key="mobile-modal"
                initial={{ left: "-20rem" }}
                animate={{
                  left: "0",
                }}
                transition={{
                  duration: 0.3,
                }}
                exit={{ left: "-20rem" }}
                className="mobile-view"
              >
                <div className="link-container">
                  <div
                    className="close-icon-container"
                    onClick={() => setIsOpenMobile(false)}
                  >
                    <ArrowForwardIosIcon
                      className="close-icon"
                      style={{ fill: "#fff", fontSize: "1.5rem" }}
                    />
                  </div>
                  <Link
                    className="link item-link"
                    to="/"
                    onClick={() => setIsOpenMobile(false)}
                  >
                    <div className="item">
                      <HomeIcon style={{ fill: "#fff" }} />
                      <span>Home</span>
                    </div>
                  </Link>
                  <Link
                    className="link item-link"
                    to="/products/men"
                    onClick={() => setIsOpenMobile(false)}
                  >
                    <div className="item">
                      <ManIcon style={{ fill: "#fff" }} />
                      <span>Men</span>
                    </div>
                  </Link>
                  <Link
                    className="link item-link"
                    to="/products/women"
                    onClick={() => setIsOpenMobile(false)}
                  >
                    <div className="item">
                      <WomanIcon
                        style={{
                          fill: "#fff",
                        }}
                      />
                      <span>Women</span>
                    </div>
                  </Link>
                  <Link
                    className="link item-link"
                    to="/products/children"
                    onClick={() => setIsOpenMobile(false)}
                  >
                    <div className="item">
                      <ChildFriendlyIcon style={{ fill: "#fff" }} />
                      <span>Children</span>
                    </div>
                  </Link>
                  <Link className="link item-link" to="/">
                    <div className="item">
                      <InfoIcon style={{ fill: "#fff" }} />
                      <span>About</span>
                    </div>
                  </Link>
                  <Link className="link item-link" to="/">
                    <div className="item">
                      <LocalPostOfficeIcon style={{ fill: "#fff" }} />
                      <span>Contact</span>
                    </div>
                  </Link>
                  <Link className="link item-link" to="/">
                    <div className="item">
                      <LocalMallIcon style={{ fill: "#fff" }} />
                      <span>Stores</span>
                    </div>
                  </Link>
                  <Link className="link item-link" to="/">
                    <div className="item">
                      <FavoriteBorderOutlinedIcon style={{ fill: "#fff" }} />
                      <span>Favorites</span>
                    </div>
                  </Link>

                  <div className="item-link">
                    <div
                      onClick={() => {
                        setIsOpenCart(!isOpenCart);
                        setIsOpenMobile(false);
                      }}
                      className="item"
                    >
                      <ShoppingCartOutlinedIcon style={{ fill: "#fff" }} />
                      <span>Cart</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
