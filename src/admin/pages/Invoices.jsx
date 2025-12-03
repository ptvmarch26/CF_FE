import { useEffect, useState } from "react";
import { Table, Button, DatePicker } from "antd";
import { useInvoice } from "../../context/InvoiceContext";
import InvoiceCreateModal from "../components/InvoiceCreateModal/InvoiceCreateModal";

const Invoices = () => {
  const { invoices, fetchInvoices } = useInvoice();
  const [invoiceState, setInvoiceState] = useState(invoices);
  const [searchText, setSearchText] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    setInvoiceState(invoices);
  }, [invoices]);

  const calcRevenue = (date) => {
    if (!date) return setRevenue(0);

    const day = new Date(date).toDateString();

    const total = invoices
      .filter((inv) => new Date(inv.createdAt).toDateString() === day)
      .reduce((sum, inv) => sum + inv.total_price, 0);

    setRevenue(total);
  };

  const filtered = invoiceState.filter((inv) =>
    searchText ? inv._id.toLowerCase().includes(searchText.toLowerCase()) : true
  );

  const columns = [
    {
      title: "Món",
      dataIndex: "items",
      render: (items) => (
        <div>
          {items.map((i) => (
            <div key={i._id} className="mb-1">
              <strong>{i.menu_id?.name || "Món"}</strong> x{i.quantity}
              {i.note && <span className="text-gray-600"> – {i.note}</span>}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Số món",
      dataIndex: "items",
      render: (items) => `${items.length} món`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      render: (v) => `${v.toLocaleString()} đ`,
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <DatePicker
            onChange={(date) => {
              setSelectedDate(date);
              calcRevenue(date);
            }}
            placeholder="Chọn ngày xem doanh thu"
            className="rounded-none"
          />

          <Button type="primary" onClick={() => setOpenCreate(true)}>
            + Tạo hóa đơn
          </Button>
        </div>

        {selectedDate && (
          <div className="text-lg font-semibold">
            Ngày {selectedDate.format("DD/MM/YYYY")} kiếm được:
            <span className="text-green-600 ml-2">
              {revenue.toLocaleString()} đ
            </span>
          </div>
        )}
      </div>

      <div className="bg-white p-4 shadow-lg">
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 8 }}
          className="cursor-pointer"
        />
      </div>

      <InvoiceCreateModal open={openCreate} setOpen={setOpenCreate} />
    </div>
  );
};

export default Invoices;
