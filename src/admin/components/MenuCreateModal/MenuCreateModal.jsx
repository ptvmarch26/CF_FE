import { useState } from "react";
import { Modal, Select, Input, InputNumber, Button } from "antd";
import { useMenu } from "../../../context/MenuContext";
import { usePopup } from "../../../context/PopupContext";

const { Option } = Select;

const categories = ["Cafe", "Sinh tố", "Nước ngọt", "Nước ép"];

const MenuCreateModal = ({ open, setOpen }) => {
  const { handleCreateMenu, fetchMenus } = useMenu();
  const { showPopup } = usePopup();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(10000);
  const [category, setCategory] = useState("");

  const resetForm = () => {
    setName("");
    setPrice(10000);
    setCategory("");
  };

  const handleSubmit = async () => {
    if (!name || !price || !category) {
      return showPopup("Vui lòng nhập đầy đủ thông tin", false);
    }

    const payload = {
      name,
      price,
      category,
    };

    const res = await handleCreateMenu(payload);

    if (res.EC === 0) {
      showPopup("Thêm món thành công!");
      fetchMenus();
      resetForm();
      setOpen(false);
    } else {
      showPopup(res.EM, false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      title="Thêm Món Mới"
      footer={null}
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Tên món</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên món..."
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Giá bán (đ)</label>
          <InputNumber
            value={price}
            min={1000}
            className="w-full"
            onChange={(v) => setPrice(v)}
            placeholder="Giá bán"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Danh mục</label>
          <Select
            value={category}
            onChange={setCategory}
            placeholder="Chọn danh mục"
            className="w-full"
          >
            {categories.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={() => setOpen(false)}>Hủy</Button>

          <Button type="primary" onClick={handleSubmit}>
            Thêm món
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MenuCreateModal;
