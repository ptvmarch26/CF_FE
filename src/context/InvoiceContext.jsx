import { createContext, useContext, useState } from "react";
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
} from "../services/api/InvoiceApi";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceDetail, setInvoiceDetail] = useState(null);

  const fetchInvoices = async () => {
    const data = await getInvoices();
    setInvoices(data?.result || []);
    return data;
  };

  const fetchInvoiceById = async (id) => {
    const data = await getInvoiceById(id);
    if (data.EC === 0) setInvoiceDetail(data.result);
    return data;
  };

  const handleCreateInvoice = async (invoiceData) => {
    return await createInvoice(invoiceData);
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        invoiceDetail,
        setInvoices,
        setInvoiceDetail,
        fetchInvoices,
        fetchInvoiceById,
        handleCreateInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);
