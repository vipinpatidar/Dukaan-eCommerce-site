import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/HomePage/Home";
import Navbar from "./components/OtherCompo/Navbar/Navbar";
import NewsLetter from "./components/OtherCompo/NewsLetter/NewsLetter";
import Footer from "./components/OtherCompo/Footer/Footer";
import ProductsListPage from "./pages/ProductsListPage/ProductsListPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success/Success";
import RequireAuth from "./CheckAuth/RequireAuth";
import { useQuery } from "react-query";
import { makeUserRequest, makePublicRequest } from "./utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "./redux/slice/cartSlice";
import AdminPolicy from "./pages/AdminPolicy/AdminPolicy";
import Profile from "./pages/Profile/Profile";
import Payment from "./pages/Payment/Payment";
import AdminPaySuccess from "./pages/Success/AdminSuccess";
import Wishlist from "./pages/Wishlist/Wishlist";
import { logoutUser } from "./redux/slice/userSlice";
import { Navigate } from "react-router-dom";

const WrapperEle = ({ logoutHandler }) => {
  return (
    <>
      <Navbar logoutHandler={logoutHandler} />
      <Outlet />
      <NewsLetter />
      <Footer />
    </>
  );
};

function App() {
  const user = useSelector((state) => state?.user?.currentUser);

  const dispatch = useDispatch();

  /*============ LOGOUT IF TIMEOUT ============= */

  const logoutHandler = async () => {
    try {
      const res = await makePublicRequest.put("/auth/logout");
      console.log(res.data);

      dispatch(logoutUser());

      <Navigate to={"/"} />;
    } catch (error) {
      console.log(error);
    }
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");

    if (!expiryDate) {
      logoutHandler();
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    setAutoLogout(remainingMilliseconds);
    //eslint-disable-next-line
  }, []);

  /*============= CART REQUEST ================== */
  //GET cart products
  const {
    isLoading,
    error,
    data: carts,
  } = useQuery(
    ["cart", user],
    async ({ signal }) => {
      if (user) {
        const res = await makeUserRequest.get(`/carts/find/${user?._id}`, {
          signal: signal,
        });
        return res.data;
      }
    },
    {
      onError: (error) => {
        if (error.response?.status === 401) {
          // logoutHandler();
        }
      },
    }
  );
  // console.log(error, "app");

  /*============= UPDATE TOTAL ====================== */

  useEffect(() => {
    if (!isLoading) {
      dispatch(addToCart({ totalProds: carts?.cartProducts?.length }));
    }
  }, [carts, dispatch, isLoading]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WrapperEle logoutHandler={logoutHandler} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <ProductsListPage />,
        },
        {
          path: "/product/:prodId",
          element: <SingleProductPage />,
        },
        {
          path: "/cart",
          element: (
            <RequireAuth>
              <Cart isLoading={isLoading} error={error} carts={carts} />
            </RequireAuth>
          ),
        },
        {
          path: "/adminPolicy",
          element: (
            <RequireAuth>
              <AdminPolicy />
            </RequireAuth>
          ),
        },
        {
          path: "/profile",
          element: (
            <RequireAuth>
              <Profile />
            </RequireAuth>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <RequireAuth>
              <Wishlist />
            </RequireAuth>
          ),
        },
        {
          path: "/pay",
          element: (
            <RequireAuth>
              <Payment />
            </RequireAuth>
          ),
        },
        {
          path: "/success",
          element: (
            <RequireAuth>
              <Success />
            </RequireAuth>
          ),
        },
        {
          path: "/adminPaySuccess",
          element: (
            <RequireAuth>
              <AdminPaySuccess />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login setAutoLogout={setAutoLogout} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
