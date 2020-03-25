import axios from 'axios';
import { Api } from 'api-client';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT
});

const Api: Api = {
  async getPosts(skip) {
    const res = await axiosInstance.get(`/posts?offset=${skip}`);
    return res.data;
  },

  async getPost(id) {
    const res = await axiosInstance.get(`/posts/${id}`);
    return res.data;
  }
};

export default Api;
