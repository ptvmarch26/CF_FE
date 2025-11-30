// src/services/api/InvoiceApi.js
import AxiosInstance from "./AxiosInstance";

export const getInvoices = async () => {
  try {
    const res = await AxiosInstance.get("/invoice");
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối server";
  }
};

export const getInvoiceById = async (id) => {
  try {
    const res = await AxiosInstance.get(`/invoice/${id}`);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối server";
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const res = await AxiosInstance.post("/invoice", invoiceData);
    return res.data;
  } catch (error) {
    return error.response?.data || "Lỗi kết nối server";
  }
};
