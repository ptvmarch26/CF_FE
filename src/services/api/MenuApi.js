// src/services/api/MenuApi.js
import AxiosInstance from "./AxiosInstance";

export const getMenus = async () => {
  try {
    const res = await AxiosInstance.get("/menu");
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối server";
  }
};

export const getMenuById = async (id) => {
  try {
    const res = await AxiosInstance.get(`/menu/${id}`);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối server";
  }
};

export const createMenu = async (menuData) => {
  try {
    const res = await AxiosInstance.post("/menu", menuData);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối server";
  }
};

export const updateMenu = async (id, menuData) => {
  try {
    const res = await AxiosInstance.put(`/menu/${id}`, menuData);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối server";
  }
};
