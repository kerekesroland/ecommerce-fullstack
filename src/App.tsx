import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import "./App.scss";
import Auth from "./pages/Auth/Auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Plans from "./pages/Plans/Plans";
import Profile from "./pages/Profile/Profile";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Checkout from "./pages/Checkout/Checkout";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      {pathname !== "/profile" && pathname !== "/checkout" && <Footer />}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:category",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "plans",
        element: (
          <PrivateRoute>
            <Plans />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isLoading ? "hidden" : "auto";
    }
  }, [isLoading]);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
