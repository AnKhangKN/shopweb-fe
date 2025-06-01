import { useState } from "react";
import TableComponent from "../../../components/admin/TableComponent/TableComponent";
import ModalComponent from "../../../components/admin/ModalComponent/ModalComponent";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  { title: "Tuổi", dataIndex: "age", key: "age" },
];

const initialData = [
  { key: "1", name: "Nguyễn Văn A", age: 32 },
  { key: "2", name: "Trần Thị B", age: 28 },
  { key: "3", name: "Lê Văn C", age: 28 },
];

const ProductManager = () => {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedAge, setSelectedAge] = useState("all"); // state lưu tuổi được chọn

  // Lấy danh sách tuổi unique để làm options cho select
  const ageOptions = Array.from(
    new Set(initialData.map((item) => item.age))
  ).sort((a, b) => a - b);

  // Lọc data theo tuổi được chọn
  const filteredData =
    selectedAge === "all"
      ? initialData
      : initialData.filter((item) => item.age === Number(selectedAge));

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-5">
        <div>
          <h3>Danh sách sản phẩm</h3>
        </div>

        {/* Select lọc theo tuổi */}
        <div>
          <select
            id="ageFilter"
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
            style={{ padding: "6px", marginLeft: "8px" }}
          >
            <option value="all">Tất cả</option>
            {ageOptions.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TableComponent
        columns={columns}
        data={filteredData}
        onRow={(record) => ({
          onClick: () => {
            setSelectedRecord(record);
            setOpen(true);
          },
        })}
      />

      {open && selectedRecord && (
        <ModalComponent
          onClose={() => setOpen(false)}
          title={`ID: ${selectedRecord.key}`}
        >
          <div className="d-flex">
            <p style={{ width: "100px" }}>Tên:</p>
            <p>{selectedRecord.name}</p>
          </div>
          <div className="d-flex">
            <p style={{ width: "100px" }}>Tuổi:</p>
            <p>{selectedRecord.age}</p>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default ProductManager;
