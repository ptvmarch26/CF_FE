import { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useInvoice } from "../../context/InvoiceContext";
import InvoiceCreateModal from "../components/InvoiceCreateModal/InvoiceCreateModal";

const Invoices = () => {
  const { invoices, fetchInvoices } = useInvoice();
  const [invoiceState, setInvoiceState] = useState(invoices);
  const [searchText, setSearchText] = useState("");
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    setInvoiceState(invoices);
  }, [invoices]);

  const filtered = invoiceState.filter((inv) =>
    searchText
      ? inv._id.toLowerCase().includes(searchText.toLowerCase())
      : true
  );

  const columns = [
    { title: "Mã hóa đơn", dataIndex: "_id" },
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
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      render: (v) => new Date(v).toLocaleString(),
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Tìm kiếm theo mã hóa đơn..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="rounded-none"
          />

          <Button type="primary" icon={<ExportOutlined />} className="rounded-none">
            Xuất file
          </Button>
        </div>

        <div className="flex justify-between">
          <Button type="primary" onClick={() => setOpenCreate(true)}>
            + Tạo hóa đơn
          </Button>
        </div>
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
