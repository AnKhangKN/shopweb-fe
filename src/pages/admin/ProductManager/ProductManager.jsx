import { useEffect, useState } from "react";
import TableComponent from "../../../components/admin/TableComponent/TableComponent";
import ModalComponent from "../../../components/admin/ModalComponent/ModalComponent";
import ButtonComponent from "../../../components/admin/ButtonComponent/ButtonComponent";
import InputComponent from "../../../components/admin/InputComponent/InputComponent";
import TextareaComponent from "../../../components/admin/TextareaComponent/TextareaComponent";
import { message } from "antd";
import * as ProductServices from "../../../services/admin/ProductServices";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ProductManager = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openAddDetail, setOpenAddDetail] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [allProducts, setAllProducts] = useState();

  const handleOpenDetail = (record) => {
    setSelectedRecord(record);
    setOpenDetail(true);
  };

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    color: "",
    size: "",
    price: "",
    quantity: "",
    description: "",
    images: [],
  });

  const handleOpenAddForm = () => {
    setOpenAdd(true);
  };

  const handleAddProduct = async () => {
    if (
      !formData.productName ||
      !formData.category ||
      !formData.color ||
      !formData.price ||
      !formData.quantity
    ) {
      message.warning("Hãy nhập các input còn thiếu!");
      return;
    }

    if (!formData.images || formData.images.length === 0) {
      message.warning("Hãy thêm ảnh sản phẩm");
      return;
    }

    if (formData.images.length > 5) {
      message.warning("Nhiều nhất 5 ảnh");
      return;
    }

    try {
      // Chuẩn bị dữ liệu gửi đi, có thể cần FormData nếu có file
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("category", formData.category);
      data.append("color", formData.color);
      data.append("size", formData.size);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("description", formData.description);

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          data.append("productImages", file); // productImages trùng với backend
        });
      }

      await ProductServices.addNewProduct(data);

      message.success("Thêm sản phẩm thành công!");
      fetchAllProducts();
      setOpenAdd(false);
      // reset form data nếu cần
      setFormData({
        productName: "",
        category: "",
        color: "",
        size: "",
        price: "",
        quantity: "",
        description: "",
        images: [],
      });
    } catch (error) {
      message.error("Thêm sản phẩm thất bại!");
      console.error(error);
    }
  };

  const [formProductDetail, setFormProductDetail] = useState({
    color: "",
    size: "",
    price: "",
    quantity: "",
    images: [],
  });

  const handleOpenAddDetailForm = (record) => {
    setSelectedRecord(record);
    setFormProductDetail({
      productId: record._id,
      color: "",
      size: "",
      price: "",
      quantity: "",
      images: [],
    });
    setOpenAddDetail(true);
  };

  const handleAddProductDetail = async (productId) => {
    const { color, size, price, quantity, images } = formProductDetail;

    if (!color || !price || !quantity) {
      message.warning("Hãy nhập các input còn thiếu!");
      return;
    }

    try {
      const data = new FormData();

      data.append("productId", productId);
      data.append("color", color);
      data.append("size", size || "");
      data.append("price", price);
      data.append("quantity", quantity);

      images.forEach((file) => {
        data.append("productImages", file);
      });

      await ProductServices.addNewProductDetail(productId, data);

      message.success("Thêm chi tiết sản phẩm thành công!");
      setOpenAddDetail(false);
      setFormProductDetail({
        color: "",
        size: "",
        price: "",
        quantity: "",
        images: [],
      });

      fetchAllProducts();

      setOpenAddDetail(false);
      setOpenDetail(false);
    } catch (error) {
      message.warning(error.message);
      console.error("Lỗi khi thêm chi tiết sản phẩm:", error);
    }
  };

  const [formEdit, setFormEdit] = useState({
    productName: "",
    category: "",
    description: "",
    status: "",
    details: [],
    images: [],
  });

  const handleOpenEditForm = (record) => {
    setSelectedRecord(record);
    setFormEdit({
      productId: record._id,
      productName: record.productName || "",
      category: record.category || "",
      description: record.description || "",
      details: record.details || [],
      images: record.images || [],
    });

    setOpenEdit(true);
  };

  const handleEditProduct = async (productId) => {
    const { productName, category, description, status, details, images } =
      formEdit;

    try {
      const data = new FormData();

      // Basic product info
      data.append("productId", productId);
      data.append("productName", productName);
      data.append("category", category);
      data.append("description", description || "");
      data.append("status", status);

      details.forEach((detail, index) => {
        if (detail.size) {
          data.append(`details[${index}][size]`, detail.size);
        }
        data.append(`details[${index}][color]`, detail.color);
        data.append(`details[${index}][price]`, detail.price);
        data.append(`details[${index}][quantity]`, detail.quantity);

        if (detail._id) {
          data.append(`details[${index}][_id]`, detail._id);
        }
      });

      // Handle images
      if (images && images.length > 0) {
        images.forEach((image) => {
          if (typeof image === "string") {
            // Nếu image là string (URL cũ), gửi dưới dạng reference
            data.append("images", image);
          } else {
            // Nếu image là File object (ảnh mới)
            data.append("productImages", image);
          }
        });
      }

      await ProductServices.updateProduct(productId, data);

      message.success("Cập nhật sản phẩm thành công!");
      setOpenDetail(false);
      setOpenEdit(false);
      fetchAllProducts();
    } catch (error) {
      console.error("Update error:", error);
      message.error(
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật"
      );
    }
  };

  const handleDeleteProductDetail = async (productId, detailId) => {
    try {
      await ProductServices.deleteProductDetail(productId, detailId);

      message.success(`Đã xóa chi tiết sản phẩm thành công (ID: ${detailId})`);

      setOpenEdit(false);
      setOpenDetail(false);

      fetchAllProducts();
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Không thể xóa chi tiết sản phẩm"
      );
    }
  };

  const handleDeleteProduct = async (record) => {
    message.success(`Đã xóa sản phẩm ${record.productName}`);
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    { title: "Danh mục", dataIndex: "category", key: "category" },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "active" ? (
          <>
            <div
              className="p-2"
              style={{ backgroundColor: "#50c878", color: "#fff" }}
            >
              Đang hoạt động
            </div>
          </>
        ) : status === "inactive" ? (
          <>
            <div
              className="p-2"
              style={{ backgroundColor: "#dc3545", color: "#fff" }}
            >
              Ngưng hoạt động
            </div>
          </>
        ) : (
          <>
            <div>Không xác định</div>
          </>
        ),
    },
    { title: "Lượt bán", dataIndex: "soldCount", key: "soldCount" },
  ];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await ProductServices.getAllProducts();

      const formattedProducts = res.products.map((item) => ({
        ...item,
        key: item._id, // hoặc item.id nếu bạn dùng field khác
      }));

      setAllProducts(formattedProducts);

      console.log(res.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-5">
        <div>
          <h3>Danh sách sản phẩm</h3>
        </div>

        <div>
          <ButtonComponent name="Thêm sản phẩm" onClick={handleOpenAddForm} />

          {openAdd && (
            <>
              <ModalComponent
                styleContainer={{ width: "800px" }}
                onClose={() => setOpenAdd(false)}
                title={`Thêm sản phẩm mới`}
              >
                <div className="d-flex align-items-center">
                  <div style={{ flex: "0 0 60%" }}>
                    <InputComponent
                      id="productName"
                      name="Tên sản phẩm"
                      autoComplete="off"
                      value={formData.productName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productName: e.target.value,
                        })
                      }
                    />

                    <InputComponent
                      id="category"
                      name="Danh mục"
                      autoComplete="off"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    />

                    <div className="d-flex align-items-center justify-content-between">
                      <InputComponent
                        id="color"
                        name="Màu sắc"
                        autoComplete="off"
                        styleContainer={{ margin: "0" }}
                        value={formData.color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                      />

                      <InputComponent
                        id="size"
                        name="Kích thước"
                        autoComplete="off"
                        styleContainer={{ margin: "0" }}
                        value={formData.size}
                        onChange={(e) =>
                          setFormData({ ...formData, size: e.target.value })
                        }
                      />
                    </div>

                    <InputComponent
                      id="price"
                      name="Đơn giá"
                      autoComplete="off"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />

                    <InputComponent
                      id="quantity"
                      name="Số lượng"
                      autoComplete="off"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                    />

                    <TextareaComponent
                      id="description"
                      name="Mô tả"
                      autoComplete="off"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div style={{ flex: "0 0 40%", padding: "20px" }}>
                    <input
                      type="file"
                      name="images"
                      multiple
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          images: Array.from(e.target.files),
                        })
                      }
                    />
                  </div>
                </div>

                <div
                  className="d-flex align-items-center gap-4"
                  style={{ marginTop: "20px" }}
                >
                  <ButtonComponent
                    onClick={handleAddProduct}
                    style={{
                      backgroundColor: "#333",
                      border: "0.5px solid #333",
                      color: "#fff",
                    }}
                    name="Thêm sản phẩm"
                  />
                  <ButtonComponent
                    onClick={() => setOpenAdd(false)}
                    name="Hủy"
                    style={{
                      backgroundColor: "#fff",
                      border: "0.5px solid #333",
                      color: "#333",
                    }}
                  />
                </div>
              </ModalComponent>
            </>
          )}
        </div>
      </div>

      <TableComponent
        columns={columns}
        data={allProducts || []}
        onRow={(record) => ({
          onClick: () => handleOpenDetail(record),
        })}
      />

      {/* Detail form */}
      {openDetail && selectedRecord && (
        <ModalComponent
          styleContainer={{ maxWidth: "1200px" }}
          styleChildren={{ fontSize: "14px" }}
          onClose={() => setOpenDetail(false)}
          title={`Chi tiết sản phẩm`}
        >
          <div className="d-flex align-items-start justify-content-between gap-3">
            {/* Thông tin cơ bản */}
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <div style={{ width: "100px" }}>Tên:</div>
                <div style={{ width: "300px" }}>
                  {selectedRecord.productName}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ width: "100px" }}>Danh mục:</div>
                <div style={{ width: "300px" }}>{selectedRecord.category}</div>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ width: "100px" }}>Trạng thái:</div>
                <div style={{ width: "300px" }}>
                  {selectedRecord.status === "active" ? (
                    <div>Đang hoạt động</div>
                  ) : (
                    <div>Ngưng hoạt động</div>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ width: "100px" }}>Lượt bán:</div>
                <div style={{ width: "300px" }}>{selectedRecord.soldCount}</div>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ width: "100px" }}>Mô tả:</div>
                <div style={{ width: "300px" }}>
                  {selectedRecord.description}
                </div>
              </div>
            </div>

            {/* Chi tiết sản phẩm */}
            <div
              className="d-grid"
              style={{
                display: "grid",
                gridTemplateRows: "1fr 1fr", // 2 hàng
                gridAutoFlow: "column", // chi tiết chảy theo cột
                gap: "16px",
              }}
            >
              {selectedRecord.details.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-column gap-3"
                  style={{
                    marginBottom: 16,
                    borderBottom: "0.5px solid #333",
                  }}
                >
                  {item.size && (
                    <div className="d-flex align-items-center justify-content-between">
                      <div style={{ width: "100px" }}>Kích thước:</div>
                      <div>{item.size}</div>
                    </div>
                  )}

                  <div className="d-flex align-items-center justify-content-between">
                    <div style={{ width: "100px" }}>Màu sắc:</div>
                    <div>{item.color}</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <div style={{ width: "100px" }}>Giá:</div>
                    <div>{item.price}</div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <div style={{ width: "100px" }}>Số lượng:</div>
                    <div>{item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ảnh sản phẩm */}
            <div className="d-flex flex-wrap gap-2">
              {selectedRecord.images.map((item, index) => (
                <div
                  key={index}
                  style={{ width: "40px", border: "0.5px solid #615d5d" }}
                >
                  <img
                    className="w-100"
                    src={`${process.env.REACT_APP_API_BACKEND_URL}/image/product/${item}`}
                    alt={`Ảnh sản phẩm ${index + 1}`}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div className="d-flex gap-2 align-items-center">
              <ButtonComponent
                name="Thêm chi tiết"
                onClick={() => handleOpenAddDetailForm(selectedRecord)}
                style={{
                  backgroundColor: "#615d5d",
                  color: "#fff",
                  border: "0.5px solid #615d5d",
                }}
              />

              <ButtonComponent
                name="Sửa"
                onClick={() => handleOpenEditForm(selectedRecord)}
                style={{
                  backgroundColor: "#fff",
                  color: "#615d5d",
                  border: "0.5px solid #615d5d",
                }}
              />

              <ButtonComponent
                name="Xóa"
                onClick={() => handleDeleteProduct(selectedRecord)}
                icon={<RiDeleteBin5Fill />}
              />
            </div>
          </div>
        </ModalComponent>
      )}

      {/* Add detail form */}
      {openAddDetail && selectedRecord && (
        <ModalComponent
          styleContainer={{ width: "800px" }}
          onClose={() => setOpenAddDetail(false)}
          title={`Thêm chi tiết cho ${selectedRecord.productName}`}
        >
          <div className="d-flex">
            <div style={{ flex: "0 0 60%" }}>
              <div>
                {selectedRecord.details.some((detail) => detail.size) && (
                  <InputComponent
                    id="size"
                    name="Kích thước"
                    autoComplete="off"
                    value={formProductDetail.size}
                    onChange={(e) =>
                      setFormProductDetail({
                        ...formProductDetail,
                        size: e.target.value,
                      })
                    }
                  />
                )}

                <InputComponent
                  id="color"
                  name="Màu sắc mới"
                  autoComplete="off"
                  value={formProductDetail.color}
                  onChange={(e) =>
                    setFormProductDetail({
                      ...formProductDetail,
                      color: e.target.value,
                    })
                  }
                />

                <InputComponent
                  id="price"
                  name="Đơn giá"
                  autoComplete="off"
                  value={formProductDetail.price}
                  onChange={(e) =>
                    setFormProductDetail({
                      ...formProductDetail,
                      price: e.target.value,
                    })
                  }
                />

                <InputComponent
                  id="quantity"
                  name="Số lượng"
                  autoComplete="off"
                  value={formProductDetail.quantity}
                  onChange={(e) =>
                    setFormProductDetail({
                      ...formProductDetail,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div style={{ flex: "0 0 40%", padding: "20px" }}>
              <input
                type="file"
                name="images"
                multiple
                onChange={(e) =>
                  setFormProductDetail({
                    ...formProductDetail,
                    images: Array.from(e.target.files),
                  })
                }
              />
            </div>
          </div>

          <div
            className="d-flex align-items-center gap-4"
            style={{ marginTop: "20px" }}
          >
            <ButtonComponent
              onClick={() => {
                handleAddProductDetail(selectedRecord._id);
              }}
              style={{
                backgroundColor: "#333",
                border: "0.5px solid #333",
                color: "#fff",
              }}
              name="Thêm chi tiết"
            />
            <ButtonComponent
              onClick={() => setOpenAddDetail(false)}
              name="Hủy"
              style={{
                backgroundColor: "#fff",
                border: "0.5px solid #333",
                color: "#333",
              }}
            />
          </div>
        </ModalComponent>
      )}

      {/* Edit form */}
      {openEdit && selectedRecord && (
        <ModalComponent
          styleContainer={{ width: "100%" }}
          styleChildren={{ fontSize: "14px" }}
          onClose={() => setOpenEdit(false)}
          title={`Sửa ${selectedRecord.productName}`}
        >
          <div className="d-flex align-items-start justify-content-between gap-3">
            {/* Thông tin cơ bản */}
            <div className="d-flex flex-column gap-3">
              <InputComponent
                id="productName"
                name={"Tên sản phẩm"}
                autoComplete="off"
                value={formEdit.productName}
                onChange={(e) =>
                  setFormEdit({
                    ...formEdit,
                    productName: e.target.value,
                  })
                }
              />

              <InputComponent
                id="category"
                name={"Danh mục"}
                autoComplete="off"
                value={formEdit.category}
                onChange={(e) =>
                  setFormEdit({
                    ...formEdit,
                    category: e.target.value,
                  })
                }
              />

              <TextareaComponent
                id="description"
                name="Mô tả"
                autoComplete="off"
                value={formEdit.description}
                onChange={(e) =>
                  setFormEdit({
                    ...formEdit,
                    description: e.target.value,
                  })
                }
              />

              <div className="d-flex align-items-center justify-content-between">
                <div style={{ width: "100px" }}>Trạng thái:</div>
                <select
                  id="status"
                  value={formEdit.status} // cần gắn value vào
                  onChange={(e) =>
                    setFormEdit({ ...formEdit, status: e.target.value })
                  }
                >
                  <option value="">--Trạng thái mới--</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngưng hoạt động</option>
                </select>
                <div>
                  {selectedRecord.status === "active" ? (
                    <div>Đang hoạt động</div>
                  ) : (
                    <div>Ngưng hoạt động</div>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={(e) =>
                    setFormEdit({
                      ...formEdit,
                      images: Array.from(e.target.files),
                    })
                  }
                />
              </div>
            </div>

            {/* Chi tiết sản phẩm */}
            <div className="d-flex gap-3">
              {formEdit.details.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-column gap-3"
                  style={{ marginBottom: 16 }}
                >
                  {item.size && (
                    <InputComponent
                      id={`size-${index}`}
                      name="Kích thước"
                      value={item.size}
                      onChange={(e) => {
                        const newDetails = [...formEdit.details];
                        newDetails[index].size = e.target.value;
                        setFormEdit({ ...formEdit, details: newDetails });
                      }}
                    />
                  )}

                  <InputComponent
                    id={`color-${index}`}
                    name="Màu sắc"
                    value={item.color}
                    onChange={(e) => {
                      const newDetails = [...formEdit.details];
                      newDetails[index].color = e.target.value;
                      setFormEdit({ ...formEdit, details: newDetails });
                    }}
                  />

                  <InputComponent
                    id={`price-${index}`}
                    name="Đơn giá"
                    value={item.price}
                    onChange={(e) => {
                      const newDetails = [...formEdit.details];
                      newDetails[index].price = e.target.value;
                      setFormEdit({ ...formEdit, details: newDetails });
                    }}
                  />

                  <InputComponent
                    id={`quantity-${index}`}
                    name="Số lượng"
                    value={item.quantity}
                    onChange={(e) => {
                      const newDetails = [...formEdit.details];
                      newDetails[index].quantity = e.target.value;
                      setFormEdit({ ...formEdit, details: newDetails });
                    }}
                  />

                  <ButtonComponent
                    name="Xóa chi tiết"
                    onClick={() =>
                      handleDeleteProductDetail(selectedRecord._id, item._id)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Ảnh sản phẩm */}
          <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center">
            {selectedRecord.images.map((item, index) => (
              <div
                key={index}
                className="d-flex  align-items-center gap-3 "
                style={{ border: "0.5px solid #615d5d" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <img
                    className="w-100 h-100 object-fit-cover"
                    src={`${process.env.REACT_APP_API_BACKEND_URL}/image/product/${item}`}
                    alt={`Ảnh sản phẩm ${index + 1}`}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>Xóa</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <div className="d-flex gap-2 align-items-center">
              <ButtonComponent
                name="Sửa"
                onClick={() => handleEditProduct(selectedRecord._id)}
                style={{
                  backgroundColor: "#615d5d",
                  color: "#fff",
                  border: "0.5px solid #615d5d",
                }}
              />

              <ButtonComponent
                name="Hủy"
                onClick={() => setOpenEdit(false)}
                style={{
                  backgroundColor: "#fff",
                  color: "#615d5d",
                  border: "0.5px solid #615d5d",
                }}
              />
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default ProductManager;
