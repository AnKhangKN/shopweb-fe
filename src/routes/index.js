import Dashboard from "../pages/admin/Dashboard/Dashboard";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderManager from "../pages/admin/OrderManager/OrderManager";
import ProductManager from "../pages/admin/ProductManager/ProductManager";
import Statistics from "../pages/admin/Statistics/Statistics";
import UserManager from "../pages/admin/UserManager/UserManager";
import Information from "../pages/admin/Information/Information";

export const routes = [
  {
    path: "/",
    page: Dashboard,
    isLayOutAdmin: true,
  },
  {
    path: "/admin/order",
    page: OrderManager,
    isLayOutAdmin: true,
  },
  {
    path: "/admin/product",
    page: ProductManager,
    isLayOutAdmin: true,
  },
  {
    path: "/admin/statistics",
    page: Statistics,
    isLayOutAdmin: true,
  },
  {
    path: "/admin/user",
    page: UserManager,
    isLayOutAdmin: true,
  },
  {
    path: "/admin/information",
    page: Information,
    isLayOutAdmin: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
