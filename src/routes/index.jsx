import { createBrowserRouter } from "react-router";
import ErrorPage from "../components/ErrorPage";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register/Index";
import UserLogin from "../pages/Register/userLogin";
import Orders from "../pages/Orders/Index";
import PrivateRoutes from "./privateRoutes";
import Dashboard from "../pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/user/login",
        Component: UserLogin,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoutes>
            <Orders></Orders>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
