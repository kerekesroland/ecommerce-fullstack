import KeyBoardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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
import { MobileTabNav } from "../../models/mobileNavTab";
type Props = {};

const Navbar = (props: Props) => {
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);

  const mobileNavTabs: Array<MobileTabNav> = [
    {
      id: "Home",
      name: "Home",
      to: "/",
      side: "left",
      delay: 0.3,
      icon: <HomeIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Men",
      name: "Men",
      to: "/products/men",
      side: "right",
      delay: 0.4,
      icon: <ManIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Women",
      name: "Women",
      to: "/products/women",
      side: "left",
      delay: 0.5,
      icon: <WomanIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Children",
      name: "Children",
      to: "/products/children",
      side: "right",
      delay: 0.4,
      icon: <ChildFriendlyIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "About",
      name: "About",
      to: "/about",
      side: "left",
      delay: 0.5,
      icon: <InfoIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Contact",
      name: "Contact",
      to: "/contact",
      side: "right",
      delay: 0.6,
      icon: <LocalPostOfficeIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Stores",
      name: "Stores",
      to: "/stores",
      side: "left",
      delay: 0.7,
      icon: <LocalMallIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Profile",
      name: "Profile",
      to: "/profile",
      side: "right",
      delay: 0.8,
      icon: <PersonOutlineIcon style={{ fill: "#fff" }} />,
    },
  ];

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
                <PersonOutlineIcon />
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
        <AnimatePresence>
          {isOpenCart && <Cart setIsOpenCart={setIsOpenCart} />}
        </AnimatePresence>
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
                  {mobileNavTabs.map((tab) => (
                    <Link
                      key={tab.id}
                      className="link item-link"
                      to={tab.to}
                      onClick={() => setIsOpenMobile(false)}
                    >
                      <motion.div
                        key={"nav-item"}
                        initial={
                          tab.side === "left"
                            ? { opacity: 0, left: "-4rem" }
                            : { opacity: 0, left: "4rem" }
                        }
                        animate={
                          tab.side === "left"
                            ? { left: 0, opacity: 1 }
                            : { left: 0, opacity: 1 }
                        }
                        transition={{
                          duration: 0.6,
                          delay: tab.delay,
                          type: "spring",
                        }}
                        className="item"
                      >
                        {tab.icon}
                        <span>{tab.name}</span>
                      </motion.div>
                    </Link>
                  ))}
                  <div className="item-link">
                    <motion.div
                      key={"nav-item"}
                      initial={{ opacity: 0, left: "-4rem" }}
                      animate={{ left: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
                      onClick={() => {
                        setIsOpenCart(!isOpenCart);
                        setIsOpenMobile(false);
                      }}
                      className="item"
                    >
                      <ShoppingCartOutlinedIcon style={{ fill: "#fff" }} />
                      <span>Cart</span>
                    </motion.div>
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
