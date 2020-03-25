import { IPost, IGetPostReturn } from 'api-client';
import api from '@/api';

const state = {
  posts: [],
  gettingPosts: false,
  errorMsg: ''
};

const getters = {};

const mutations = {
  setGettingPosts(state: { gettingPosts: boolean }, gettingPosts: boolean) {
    state.gettingPosts = gettingPosts;
  },
  setErrorMsg(state: { errorMsg: string }, errorMsg: string) {
    state.errorMsg = errorMsg;
  },
  setPosts(state: { posts: IPost[] }, posts: IPost[]) {
    state.posts = posts;
  }
};

const actions = {
  getPosts({ commit }: any) {
    commit('setGettingPosts', true);
    api
      .getPosts()
      .then((res: IGetPostReturn) => {
        commit('setGettingPosts', false);
        commit('setPosts', res);
      })
      .catch(error => {
        console.log('error', error);
        commit('setErrorMsg', error);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
