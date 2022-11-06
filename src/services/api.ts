import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.131.36:3333",
});
