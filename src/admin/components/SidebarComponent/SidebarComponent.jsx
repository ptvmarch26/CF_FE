import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import { IoReceiptOutline } from "react-icons/io5";

function SidebarComponent({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const menuItems = [
    {
      name: "Quản lý hoá đơn",
      path: "/admin/invoices",
      icon: <IoReceiptOutline size={20} />,
    },
    {
      name: "Quản lý menus",
      path: "/admin/menus",
      icon: <IoReceiptOutline size={20} />,
    },
  ];

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-50"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-[60] h-screen w-[300px] bg-gray-900 text-white shadow-lg transition-transform duration-300 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
    overflow-y-auto`}
      >
        <nav className="mt-20">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path} onClick={toggleSidebar}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-4 rounded transition-all duration-200 relative overflow-hidden ${
                    location.pathname === item.path
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-800 hover:text-gray-200"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-1 bg-blue-500 ${
                      location.pathname === item.path
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  handleLogout();
                  navigate("/admin");
                }}
                className="flex items-center gap-3 p-4 mt-5 rounded transition-all duration-200 text-red-600 hover:bg-red-600 hover:text-white w-full"
              >
                <FiLogOut size={20} />
                <span>Đăng xuất</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidebarComponent;
