import axios from "axios";

export const getOrders = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BACKEND_URL}/admin/orders`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderDetail = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BACKEND_URL}/admin/order/${id}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BACKEND_URL}/admin/order/${id}`,
      status
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
