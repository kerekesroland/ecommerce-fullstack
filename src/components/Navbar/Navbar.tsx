import "./Navbar.scss";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import ManIcon from "@mui/icons-material/Man";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WomanIcon from "@mui/icons-material/Woman";

import { MobileTabNav } from "../../models/mobileNavTab";
import { RootState } from "../../store/store";
import Backdrop from "../Backdrop/Backdrop";
import Cart from "../Cart/Cart";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isAuthenticated
  );
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
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
      name: t("data.navigation.profile.title"),
      to: "/profile",
      side: "right",
      delay: 0.8,
      icon: <PersonOutlineIcon style={{ fill: "#fff" }} />,
    },
  ];

  //Function to call when the backdrop is clicked
  const handleCloseMobile = () => setIsOpenMobile(false);

  //For the profile onHover open and close
  const closeDropdown = () => setIsOpenProfile(false);

  const openDropdown = () => setIsOpenProfile(true);

  //Observable kind of thing to keep track of the mobile menu
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isOpenMobile ? "hidden" : "auto";
    }
  }, [isOpenMobile]);

  //Change the preferred language and persist the changes, default is en
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
              <div className="profile">
                <div
                  className="profile-icon"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <PersonOutlineIcon />
                </div>

                {isOpenProfile && (
                  <ul
                    className="profile-dropdown"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <Link className="link" to="/auth">
                      <li>{t("data.navigation.profile.title")}</li>
                    </Link>
                    <li>Settings</li>
                    <Link className="link" to="/auth">
                      <li>
                        {isAuthenticated
                          ? t("data.navigation.profile.logout")
                          : t("data.navigation.profile.login")}
                      </li>
                    </Link>
                  </ul>
                )}
              </div>

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
              <Backdrop onClick={handleCloseMobile} />
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
