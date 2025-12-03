import AdminLayout from "../admin/layout/AdminLayout";
import Menus from "../admin/pages/Menus";
import Invoices from "../admin/pages/Invoices";
import LoginPage from "../admin/pages/LoginPage";

const adminRoutes = [
  {
    path: "/",
    component: LoginPage,
    // Layout: AdminLayout,
  },
  {
    path: "/admin/menus",
    component: Menus,
    Layout: AdminLayout,
  },
  {
    path: "/admin/invoices",
    component: Invoices,
    Layout: AdminLayout,
  },
];

export { adminRoutes };
