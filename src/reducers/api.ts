import axios from "axios";
import { API_URL } from "../api/axiosConfig";

export const api = axios.create({
  baseURL: `${API_URL}/company`,
});

const apiUrl = `${API_URL}/product/`;
export const createProductsApi = async (data: any) => {
  try {
    await axios.post(apiUrl + "createProduct", data);
  } catch (error) {
    throw error;
  }
};
