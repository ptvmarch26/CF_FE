import { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useMenu } from "../../context/MenuContext";
import MenuCreateModal from "../components/MenuCreateModal/MenuCreateModal";

const Menus = () => {
  const { menus, fetchMenus } = useMenu();
  const [openCreate, setOpenCreate] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [menuState, setMenuState] = useState(menus);

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    setMenuState(menus);
  }, [menus]);

  const filteredMenus = menuState.filter((item) =>
    searchText
      ? item.name.toLowerCase().includes(searchText.toLowerCase())
      : true
  );

  const columns = [
    { title: "Tên món", dataIndex: "name", key: "name" },
    { title: "Danh mục", dataIndex: "category", key: "category" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (v) => `${v.toLocaleString()} đ`,
    },
  ];

  return (
    <div className="lg:ml-[300px] mt-[64px] px-2 py-4 lg:p-6 min-h-screen">
      <div className="space-y-3 mb-4">
        <div className="flex gap-4">
          <Input
            placeholder="Tìm kiếm theo tên món..."
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
            + Thêm món
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg">
        <Table
          dataSource={filteredMenus}
          columns={columns}
          pagination={{ pageSize: 8 }}
          rowKey="_id"
          className="cursor-pointer"
        />
      </div>

      <MenuCreateModal open={openCreate} setOpen={setOpenCreate} />
    </div>
  );
};

export default Menus;
