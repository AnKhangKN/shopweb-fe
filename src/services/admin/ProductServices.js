import axios from "axios";

export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BACKEND_URL}/admin/products`,
      data
    );

    return res.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
    console.error("Lỗi khi thêm sản phẩm:", errorMsg);
    throw new Error(errorMsg);
  }
};

export const getAllProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BACKEND_URL}/admin/products`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
