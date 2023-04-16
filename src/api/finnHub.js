import axios from "axios";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: "cg7tithr01qsgaf0ikrgcg7tithr01qsgaf0iks0",
  },
});
