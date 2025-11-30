import { useEffect, useState } from "react";
import { Modal, InputNumber, Input, Button, Table } from "antd";
import { useMenu } from "../../../context/MenuContext";
import { useInvoice } from "../../../context/InvoiceContext";
import { usePopup } from "../../../context/PopupContext";

const CATEGORY_ORDER = ["Cafe", "Sinh tố", "Nước ngọt", "Nước ép"];

const InvoiceCreateModal = ({ open, setOpen }) => {
  const { menus, fetchMenus } = useMenu();
  const { handleCreateInvoice, fetchInvoices } = useInvoice();
  const { showPopup } = usePopup();

  const [items, setItems] = useState([]);

  const [currentMenu, setCurrentMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const [temp, setTemp] = useState("Lạnh"); // luôn hiện

  useEffect(() => {
    fetchMenus();
  }, []);

  // GROUP BY CATEGORY
  const grouped = menus.reduce((acc, m) => {
    if (!acc[m.category]) acc[m.category] = [];
    acc[m.category].push(m);
    return acc;
  }, {});

  const sortedCategories = CATEGORY_ORDER.filter((c) => grouped[c]);

  const resetItem = () => {
    setCurrentMenu(null);
    setQuantity(1);
    setNote("");
    setTemp("Lạnh");
  };

  const handleSelectProduct = (menu) => {
    setCurrentMenu(menu._id);

    if (menu.category === "Cafe") setTemp("Lạnh");
    else setTemp("Lạnh");
  };

  const handleAddItem = () => {
    if (!currentMenu) return showPopup("Chọn món trước!", false);

    const menu = menus.find((m) => m._id === currentMenu);

    let finalNote = note;
    if (menu.category === "Cafe") {
      finalNote = temp + (note ? " - " + note : "");
    }

    const newItem = {
      menu_id: currentMenu,
      name: menu.name,
      category: menu.category,
      quantity,
      price: menu.price,
      total: menu.price * quantity,
      note: finalNote,
    };

    setItems([...items, newItem]);
    resetItem();
  };

  const handleSubmit = async () => {
    if (items.length === 0) return showPopup("Hóa đơn trống!", false);

    const payload = {
      items: items.map((i) => ({
        menu_id: i.menu_id,
        quantity: i.quantity,
        note: i.note,
      })),
    };

    const res = await handleCreateInvoice(payload);

    if (res.EC === 0) {
      showPopup("Tạo hóa đơn thành công!");
      fetchInvoices();
      setItems([]);
      setOpen(false);
    } else showPopup(res.EM, false);
  };

  const columns = [
    { title: "Tên món", dataIndex: "name" },
    { title: "Danh mục", dataIndex: "category" },
    {
      title: "Giá",
      dataIndex: "price",
      render: (v) => `${v.toLocaleString()} đ`,
    },
    { title: "SL", dataIndex: "quantity" },
    { title: "Ghi chú", dataIndex: "note" },
    {
      title: "Thành tiền",
      dataIndex: "total",
      render: (v) => `${v.toLocaleString()} đ`,
    },
  ];

  const selectedMenu = menus.find((m) => m._id === currentMenu);
  const isCafe = selectedMenu?.category === "Cafe";

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={950}
      title="Tạo Hóa Đơn"
      footer={null}
    >
      <div className="grid grid-cols-3 gap-4">
        {/* DANH SÁCH MÓN – CLICK GRID */}
        <div className="col-span-2 h-[350px] overflow-y-auto border p-3 rounded-md">
          {sortedCategories.map((cat) => (
            <div key={cat} className="mb-4">
              <div className="font-bold text-lg mb-2">{cat}</div>

              <div className="grid grid-cols-2 gap-2">
                {grouped[cat].map((m) => (
                  <div
                    key={m._id}
                    onClick={() => handleSelectProduct(m)}
                    className={`
                      p-2 border rounded cursor-pointer hover:bg-blue-100 transition
                      ${
                        currentMenu === m._id
                          ? "bg-blue-200 border-blue-500"
                          : ""
                      }
                    `}
                  >
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-gray-600">
                      {m.price.toLocaleString()}đ
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FORM CHI TIẾT */}
        <div className="col-span-1 flex flex-col gap-3">
          <div>
            <label className="font-semibold">Số lượng</label>
            <InputNumber
              min={1}
              value={quantity}
              onChange={setQuantity}
              className="w-full"
            />
          </div>

          <div>
            <label className="font-semibold">Nhiệt độ</label>
            <select
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className={`w-full p-2 border rounded ${
                isCafe ? "" : "bg-gray-200 cursor-not-allowed"
              }`}
              disabled={!isCafe}
            >
              <option value="Lạnh">Lạnh</option>
              <option value="Nóng">Nóng</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Ghi chú thêm</label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ví dụ: ít đường..."
            />
          </div>

          <Button type="primary" onClick={handleAddItem}>
            + Thêm vào hóa đơn
          </Button>
        </div>
      </div>

      {/* TABLE ITEMS */}
      <div className="mt-4">
        <Table
          dataSource={items}
          columns={columns}
          pagination={false}
          rowKey={(r) => r.menu_id + r.note + r.quantity}
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button onClick={() => setOpen(false)}>Hủy</Button>
        <Button type="primary" onClick={handleSubmit}>
          Tạo hóa đơn
        </Button>
      </div>
    </Modal>
  );
};

export default InvoiceCreateModal;
