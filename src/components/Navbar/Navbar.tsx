import "./Navbar.scss";

import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import HomeIcon from "@mui/icons-material/Home";
import ManIcon from "@mui/icons-material/Man";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import WomanIcon from "@mui/icons-material/Woman";
import flag_en from "../../images/United kingdom.svg";
import flag_fr from "../../images/France.svg";
import flag_de from "../../images/Germany.svg";
import { MobileTabNav } from "../../models/mobileNavTab";
import Backdrop from "../Backdrop/Backdrop";
import Cart from "../Cart/Cart";
import { auth } from "../../firebase/config";
import { authService } from "../../api/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { emptyCart } from "../../store/slices/cartSlice";
import OptionSelector from "../OptionSelector/OptionSelector";
import { useCurrency } from "../../context/CurrencyContext";
import CurrencyIcon from "../../images/CurrencyIcon.svg";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { currentCurrency, setCurrency } = useCurrency();
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartRef = useRef<HTMLDivElement>(null);
  const currentUser = auth?.currentUser;
  const navigate: NavigateFunction = useNavigate();
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<string>("/");
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
      id: "Plans",
      name: t("data.navigation.plans"),
      to: "/plans",
      side: "left",
      delay: 0.7,
      icon: <LoyaltyIcon style={{ fill: "#fff" }} />,
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

  const { pathname } = useLocation();

  const canCartBeClicked = pathname !== "/checkout" ? true : false;

  //Function to call when the backdrop is clicked
  const handleCloseMobile = () => setIsOpenMobile(false);

  //For the profile onHover open and close
  const closeDropdown = () => setIsOpenProfile(false);

  const openDropdown = () => setIsOpenProfile(true);

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        setTimeout(() => {
          navigate("/auth");
        }, 500);
        dispatch(emptyCart());
      })
      .catch((error) => console.error(error));
  };

  //Observable kind of thing to keep track of the mobile menu
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isOpenMobile ? "hidden" : "auto";
    }
    setActiveMobileTab(pathname);
  }, [isOpenMobile]);

  useEffect(() => {
    cartRef?.current?.classList.add("cart-animation");
    setTimeout(() => {
      cartRef?.current?.classList.remove("cart-animation");
    }, 1000);
  }, [cart.length]);

  //Change the preferred language and persist the changes, default is en
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);
  };
  const changeLanguageByClick = useCallback((language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("i18nextLng", language);
  }, []);

  //Change the preferred currency and persist the changes, default is USD
  const changeCurrency = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCurrency = e.target.value;
      setCurrency?.(selectedCurrency.toUpperCase());
    },
    []
  );

  const MENUITEMS = [
    {
      id: 1,
      to: "/products/men",
      translatedValue: "data.navigation.men",
    },
    {
      id: 2,
      to: "/products/women",
      translatedValue: "data.navigation.women",
    },
    {
      id: 3,
      to: "/products/children",
      translatedValue: "data.navigation.children",
    },
    {
      id: 4,
      to: "/plans",
      translatedValue: "data.navigation.plans",
    },
  ];

  const LANGUAGE_OPTIONS = [
    {
      label: "EN",
      value: "en",
    },
    {
      label: "FR",
      value: "fr",
    },
    {
      label: "DE",
      value: "de",
    },
  ];

  const CURRENCY_OPTIONS = [
    {
      label: "USD",
      value: "usd",
    },
    {
      label: "EUR",
      value: "eur",
    },
    {
      label: "HUF",
      value: "huf",
    },
  ];

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="wrapper">
          <div className="left">
            <div
              className="mobile-item"
              onClick={() => setIsOpenMobile(!isOpenMobile)}
            >
              <MenuIcon style={{ cursor: "pointer" }} />
            </div>
            <OptionSelector
              options={LANGUAGE_OPTIONS}
              currentOption={language}
              changeOption={changeLanguage}
            />
            <OptionSelector
              options={CURRENCY_OPTIONS}
              currentOption={currentCurrency.toLowerCase()}
              changeOption={changeCurrency}
            />
          </div>

          <div className="center">
            <Link className="link" to="/">
              RIVENA
            </Link>
          </div>

          <div className="right">
            {MENUITEMS.map((item) => (
              <div
                key={item.id}
                className={`item ${
                  window.location.pathname === item.to ? "active" : ""
                }`}
              >
                <Link className="link" to={item.to}>
                  {t(item.translatedValue)}
                </Link>
              </div>
            ))}
            <div className="icons">
              <div className="profile">
                <div
                  className="profile-icon"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <PersonOutlineIcon style={{ cursor: "pointer" }} />
                </div>

                {isOpenProfile && (
                  <ul
                    className="profile-dropdown"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <Link className="link" to="/profile">
                      <li>{t("data.navigation.profile.title")}</li>
                    </Link>
                    <Link className="link" to="/">
                      <li>{t("data.navigation.profile.settings")}</li>
                    </Link>
                    {currentUser ? (
                      <div className="link" onClick={handleLogout}>
                        <li style={{ cursor: "pointer" }}>
                          {t("data.navigation.profile.logout")}
                        </li>
                      </div>
                    ) : (
                      <Link className="link" to="/auth">
                        <li>{t("data.navigation.profile.login")}</li>
                      </Link>
                    )}
                  </ul>
                )}
              </div>

              <div
                ref={cartRef}
                className="cart-icon"
                onClick={() =>
                  canCartBeClicked ? setIsOpenCart(!isOpenCart) : {}
                }
              >
                <ShoppingCartOutlinedIcon style={{ cursor: "pointer" }} />
                <span>{cart?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpenCart && (
            <div className="blurredBackground">
              <div
                onClick={() => setIsOpenCart(false)}
                className="animatedCartContainer"
              >
                <Cart setIsOpenCart={setIsOpenCart} />
              </div>
            </div>
          )}
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
                  <div className="selectors-container">
                    <select
                      onChange={(e) =>
                        setCurrency?.(e.target.value.toUpperCase())
                      }
                      className="mobile-currency__options"
                    >
                      {CURRENCY_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          className="currency_option"
                          value={option.value}
                        >
                          {option?.label}
                        </option>
                      ))}
                    </select>
                    <div className="language-helper">
                      <div
                        className="language"
                        onClick={() => changeLanguageByClick("en")}
                      >
                        <img src={flag_en} alt="en" />
                      </div>
                      <div
                        className="language"
                        onClick={() => changeLanguageByClick("fr")}
                      >
                        <img src={flag_fr} alt="fr" />
                      </div>
                      <div
                        className="language"
                        onClick={() => changeLanguageByClick("de")}
                      >
                        <img src={flag_de} alt="de" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="close-icon-container"
                    onClick={() => setIsOpenMobile(false)}
                  >
                    <ArrowForwardIosIcon
                      className="close-icon"
                      style={{ fill: "#fff", fontSize: "1.5rem" }}
                    />
                  </div>
                  <div className="options-container">
                    {mobileNavTabs.map((tab) => (
                      <Link
                        key={tab.id}
                        className={`link item-link ${
                          activeMobileTab === tab.to ? "active" : ""
                        }`}
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
                        transition={{
                          duration: 0.6,
                          delay: 0.9,
                          type: "spring",
                        }}
                        onClick={() => {
                          if (canCartBeClicked) {
                            setIsOpenCart(!isOpenCart);
                            setIsOpenMobile(false);
                          }
                          setIsOpenMobile(false);
                        }}
                        className="item"
                      >
                        <ShoppingCartOutlinedIcon style={{ fill: "#fff" }} />
                        <span>{t("data.navigation.cart")}</span>
                      </motion.div>
                    </div>
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
