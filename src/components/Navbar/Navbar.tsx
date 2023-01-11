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
import { useTranslation } from "react-i18next";
type Props = {};

const Navbar = (props: Props) => {
  const { t, i18n } = useTranslation();
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>(i18n.language);
  const mobileNavTabs: Array<MobileTabNav> = [
    {
      id: "Home",
      name: t("data.navigation.home"),
      to: "/",
      side: "left",
      delay: 0.3,
      icon: <HomeIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Men",
      name: t("data.navigation.men"),
      to: "/products/men",
      side: "right",
      delay: 0.4,
      icon: <ManIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Women",
      name: t("data.navigation.women"),
      to: "/products/women",
      side: "left",
      delay: 0.5,
      icon: <WomanIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Children",
      name: t("data.navigation.children"),
      to: "/products/children",
      side: "right",
      delay: 0.4,
      icon: <ChildFriendlyIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "About",
      name: t("data.navigation.about"),
      to: "/about",
      side: "left",
      delay: 0.5,
      icon: <InfoIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Contact",
      name: t("data.navigation.contact"),
      to: "/contact",
      side: "right",
      delay: 0.6,
      icon: <LocalPostOfficeIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Stores",
      name: t("data.navigation.stores"),
      to: "/stores",
      side: "left",
      delay: 0.7,
      icon: <LocalMallIcon style={{ fill: "#fff" }} />,
    },
    {
      id: "Profile",
      name: t("data.navigation.profile"),
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

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);
  };

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
            <div className="item select-wrapper">
              <select
                className="select-tag"
                value={language}
                onChange={changeLanguage}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
              </select>
              <span className="select-tag-arrow" />
            </div>

            <div className="item">
              <Link className="link" to="/products/men">
                {t("data.navigation.men")}
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/women">
                {t("data.navigation.women")}
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/children">
                {t("data.navigation.children")}
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
                {t("data.navigation.about")}
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/">
                {t("data.navigation.contact")}
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/">
                {t("data.navigation.stores")}
              </Link>
            </div>
            <div className="icons">
              <div
                className="cart-icon"
                onClick={() => setIsOpenCart(!isOpenCart)}
              >
                <ShoppingCartOutlinedIcon />
                <span>2</span>
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
                      <span>{t("data.navigation.cart")}</span>
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
