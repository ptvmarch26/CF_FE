import { createContext, useContext, useState } from "react";
import {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
} from "../services/api/MenuApi";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [menuDetail, setMenuDetail] = useState(null);

  const fetchMenus = async () => {
    const data = await getMenus();
    setMenus(data?.result || []);
    return data;
  };

  const fetchMenuById = async (id) => {
    const data = await getMenuById(id);
    if (data.EC === 0) setMenuDetail(data.result);
    return data;
  };

  const handleCreateMenu = async (menuData) => {
    return await createMenu(menuData);
  };

  const handleUpdateMenu = async (id, menuData) => {
    const data = await updateMenu(id, menuData);

    if (data.EC === 0) {
      setMenus((prev) =>
        prev.map((m) => (m._id === id ? { ...m, ...menuData } : m))
      );
    }

    return data;
  };

  return (
    <MenuContext.Provider
      value={{
        menus,
        menuDetail,
        setMenus,
        setMenuDetail,
        fetchMenus,
        fetchMenuById,
        handleCreateMenu,
        handleUpdateMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
