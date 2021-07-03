import axios from "axios";
// require("dotenv").config({ path: "../../.env" });

// const { HOST_NAME, BACK_PORT } = process.env;
// export const baseUrl = "http://localhost:8000";
console.log(process.env.REACT_APP_HOST_NAME);
console.log(process.env.REACT_APP_BACK_PORT);
export const baseUrl = `http://${process.env.REACT_APP_HOST_NAME}:${process.env.REACT_APP_BACK_PORT}`;
export const baseImg =
  "https://gdb.rferl.org/896C5DE4-4A05-4ABF-8A65-98757BCE519C_w1080_h608.jpg";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
