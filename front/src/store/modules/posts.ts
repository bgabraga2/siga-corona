import { IPost, IGetPostReturn } from 'api-client';
import api from '@/api';

const state = {
  allPosts: [],
  gettingPosts: false,
  errorMsg: '',
  filterType: '',
  total: 0,
  limit: 0,
  offset: 0
};

const getters = {
  getPosts: (state: { allPosts: IPost[] }) => {
    return state.allPosts;
  },
  getOffset: (state: { limit: number; offset: number }) => {
    return state.limit + state.offset;
  },
  haveMorePost: (state: { limit: number; offset: number; total: number }) => {
    return state.offset + state.limit <= state.total;
  }
};

const mutations = {
  setGettingPosts(state: { gettingPosts: boolean }, gettingPosts: boolean) {
    state.gettingPosts = gettingPosts;
  },
  setErrorMsg(state: { errorMsg: string }, errorMsg: string) {
    state.errorMsg = errorMsg;
  },
  setAllPosts(state: { allPosts: any }, res: IGetPostReturn) {
    state.allPosts.push(...res.posts);
  },
  setTotal(state: { total: number }, res: IGetPostReturn) {
    state.total = res.total;
  },
  setLimit(state: { limit: number }, res: IGetPostReturn) {
    state.limit = res.limit;
  },
  setOffset(state: { offset: number }, res: IGetPostReturn) {
    state.offset = res.offset;
  }
};

const actions = {
  getPosts(context: any) {
    return new Promise((resolve, reject) => {
      context.commit('setGettingPosts', true);
      api
        .getPosts(context.getters.getOffset)
        .then((res: IGetPostReturn) => {
          context.commit('setGettingPosts', false);
          context.commit('setAllPosts', res);
          context.commit('setTotal', res);
          context.commit('setLimit', res);
          context.commit('setOffset', res);
          resolve();
        })
        .catch(error => {
          context.commit('setErrorMsg', error);
          reject();
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
