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
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [allProducts, setAllProducts] = useState();

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

    if (formData.images.length > 3) {
      message.warning("Nhiều nhất 3 ảnh");
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

  const handleOpenEditForm = (record) => {
    setSelectedRecord(record);
    setOpenEdit(true);
  };

  const handleOpenAddDetailForm = (record) => {
    setSelectedRecord(record);
    setOpenDetail(true);
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
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Lượt bán", dataIndex: "soldCount", key: "soldCount" },
    {
      title: "",
      key: "active",
      onCell: () => {
        return {
          style: {
            width: "280px",
          },
        };
      },
      render: (record) => (
        <div className="d-flex gap-2 align-items-center">
          <ButtonComponent
            name="Thêm chi tiết"
            onClick={() => handleOpenAddDetailForm(record)}
            style={{
              backgroundColor: "#615d5d",
              color: "#fff",
              border: "0.5px solid #615d5d",
            }}
          />

          <ButtonComponent
            name="Sửa"
            onClick={() => handleOpenEditForm(record)}
            style={{
              backgroundColor: "#fff",
              color: "#615d5d",
              border: "0.5px solid #615d5d",
            }}
          />

          <ButtonComponent
            name="Xóa"
            onClick={() => handleDeleteProduct(record)}
            icon={<RiDeleteBin5Fill />}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await ProductServices.getAllProducts();

      const formattedProducts = res.product.map((item) => ({
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

          {openAdd ? (
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

                    <div className="d-flex align-items-center gap-4">
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
          ) : (
            <></>
          )}
        </div>
      </div>

      <TableComponent columns={columns} data={allProducts || []} />

      {/* Edit form */}
      {openEdit && selectedRecord && (
        <ModalComponent
          onClose={() => setOpenEdit(false)}
          title={`Sửa sản phẩm`}
        >
          <div className="d-flex ">
            <div>
              <div>Thông tin sản phẩm</div>
              <div>
                <div className="d-flex">
                  <p style={{ width: "100px" }}>Tên sản phẩm:</p>
                  <p>{selectedRecord.productName}</p>
                </div>
                <div className="d-flex">
                  <p style={{ width: "100px" }}>Tuổi:</p>
                  <p>{selectedRecord.age}</p>
                </div>
              </div>
            </div>

            <div>
              <div>Chi tiết sản phẩm</div>
              <div></div>
            </div>

            <div>
              <div>Hình ảnh sản phẩm</div>
              <div></div>
            </div>
          </div>
        </ModalComponent>
      )}

      {/* Add detail form */}
      {openDetail && selectedRecord && (
        <ModalComponent
          styleContainer={{ width: "800px" }}
          onClose={() => setOpenDetail(false)}
          title={`Thêm chi tiết cho ${selectedRecord.productName}`}
        >
          <div className="d-flex">
            <div style={{ flex: "0 0 60%" }}>
              <div>
                <InputComponent
                  id="size"
                  name="Kích thước mới"
                  autoComplete="off"
                />

                <InputComponent
                  id="color"
                  name="Màu sắc mới"
                  autoComplete="off"
                />

                <InputComponent id="price" name="Đơn giá" autoComplete="off" />

                <InputComponent
                  id="quantity"
                  name="Số lượng"
                  autoComplete="off"
                />
              </div>
            </div>

            <div style={{ flex: "0 0 40%", padding: "20px" }}>
              <input type="file" name="images" multiple />
            </div>
          </div>

          <div
            className="d-flex align-items-center gap-4"
            style={{ marginTop: "20px" }}
          >
            <ButtonComponent
              style={{
                backgroundColor: "#333",
                border: "0.5px solid #333",
                color: "#fff",
              }}
              name="Thêm sản phẩm"
            />
            <ButtonComponent
              onClick={() => setOpenDetail(false)}
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
    </div>
  );
};

export default ProductManager;
