import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/admin/TableComponent/TableComponent";
import ModalComponent from "../../../components/admin/ModalComponent/ModalComponent";
import SortSelectComponent from "../../../components/admin/SortSelectComponent/SortSelectComponent";
import * as OrderServices from "../../../services/admin/OrderServices";
import moment from "moment";

const columnsConfig = (onSelectRecord) => [
  {
    title: "Mã đơn",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "SĐT",
    dataIndex: ["shippingAddress", "phone"],
    key: "phone",
  },
  {
    title: "Địa chỉ",
    dataIndex: ["shippingAddress", "address"],
    key: "address",
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (price) => `${price.toLocaleString()} ₫`,
  },
  {
    title: "Thanh toán",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
    render: (method) =>
      method === "cod" ? "Thanh toán khi nhận" : "Thẻ tín dụng",
  },
  {
    title: "Đã thanh toán",
    dataIndex: "isPaid",
    key: "isPaid",
    render: (paid) => (paid ? "✅ Có" : "❌ Chưa"),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const colorMap = {
        pending: "gray",
        processing: "blue",
        shipped: "green",
        canceled: "red",
      };
      return (
        <span
          style={{ color: colorMap[status] || "black", fontWeight: "bold" }}
        >
          {status.toUpperCase()}
        </span>
      );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => moment(date).format("DD/MM/YYYY HH:mm"),
  },
  {
    title: "Chi tiết",
    key: "action",
    render: (_, record) => (
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => onSelectRecord(record)}
      >
        Xem
      </button>
    ),
  },
];

const OrderManager = () => {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [tempStatus, setTempStatus] = useState(""); // trạng thái tạm khi chỉnh sửa

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      await OrderServices.updateOrderStatus(orderId, {
        status: newStatus,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      setSelectedRecord((prev) =>
        prev && prev._id === orderId ? { ...prev, status: newStatus } : prev
      );

      alert("Cập nhật trạng thái thành công");
    } catch (error) {
      alert("Cập nhật trạng thái thất bại");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await OrderServices.getOrders();
        setOrders(res || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const statusOptions = [
    "all",
    ...Array.from(new Set(orders.map((o) => o.status))),
  ];

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-5">
        <h3>Danh sách đơn hàng</h3>
        <SortSelectComponent
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "Tất cả" : s.toUpperCase()}
            </option>
          ))}
        </SortSelectComponent>
      </div>

      <TableComponent
        columns={columnsConfig((record) => {
          setSelectedRecord(record);
          setTempStatus(record.status); // lưu trạng thái tạm
          setOpen(true);
        })}
        data={filteredOrders}
      />

      {open && selectedRecord && (
        <ModalComponent
          onClose={() => setOpen(false)}
          title={`Đơn hàng #${selectedRecord._id}`}
        >
          <div>
            <p>
              <strong>Khách hàng:</strong> {selectedRecord.userId}
            </p>
            <p>
              <strong>SĐT:</strong> {selectedRecord.shippingAddress.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedRecord.shippingAddress.address}
              , {selectedRecord.shippingAddress.city}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {selectedRecord.totalPrice.toLocaleString()} ₫
            </p>
            <p>
              <strong>Thanh toán:</strong> {selectedRecord.paymentMethod}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <select
                value={tempStatus}
                onChange={(e) => setTempStatus(e.target.value)}
              >
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đã giao hàng</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </p>

            <p>
              <strong>Ngày đặt:</strong>{" "}
              {moment(selectedRecord.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>
            <hr />
            <p>
              <strong>Sản phẩm:</strong>
            </p>
            <ul>
              {selectedRecord.items.map((item) => (
                <li key={item._id}>
                  {item.productName} - {item.color}/{item.size} ×{" "}
                  {item.quantity} = {item.price.toLocaleString()} ₫
                </li>
              ))}
            </ul>

            <div className="mt-4 d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setOpen(false)}
              >
                Đóng
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (tempStatus !== selectedRecord.status) {
                    handleChangeStatus(selectedRecord._id, tempStatus);
                  }
                  setOpen(false);
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default OrderManager;
