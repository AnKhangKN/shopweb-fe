import React, { useState } from "react";
import TableComponent from "../../../components/admin/TableComponent/TableComponent";
import ModalComponent from "../../../components/admin/ModalComponent/ModalComponent";
import SortSelectComponent from "../../../components/admin/SortSelectComponent/SortSelectComponent";

const columns = [
  { title: "Tên", dataIndex: "name", key: "name" },
  { title: "Tuổi", dataIndex: "age", key: "age" },
];

const initialData = [
  { key: "1", name: "Nguyễn Văn A", age: 32 },
  { key: "2", name: "Trần Thị B", age: 28 },
];

const UserManager = () => {
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
          <h3>Danh sách người dùng</h3>
        </div>

        {/* Select lọc theo tuổi */}
        <div>
          <SortSelectComponent
            id="ageFilter"
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
          >
            {ageOptions.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </SortSelectComponent>
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

export default UserManager;
