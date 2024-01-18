import axios from "axios";

export const connection = axios.create({
  baseURL: "http://localhost:3500",
  // baseURL:"https://niti-server.onrender.com",
  // baseURL:" http://127.0.0.1:4040",
});
