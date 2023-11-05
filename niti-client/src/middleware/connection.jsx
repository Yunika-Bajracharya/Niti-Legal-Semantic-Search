import axios from "axios";

export const connection = axios.create({
  baseURL: "http://localhost:3500",
});
