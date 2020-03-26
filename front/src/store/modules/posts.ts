import { IPost, IGetPostReturn } from 'api-client';
import api from '@/api';
var Promise = require('es6-promise').Promise;

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
  getPosts: (state: { allPosts: IPost[]; filterType: string }) => {
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
  setFilterType(state: { filterType: string }, filter: string) {
    state.filterType = filter;
  },
  setAllPosts(state: { allPosts: any }, res: IGetPostReturn) {
    state.allPosts.push(...res.posts);
  },
  setTotal(state: { total: number }, res: IGetPostReturn) {
    state.total = res.total;
  },
  setLimit(state: { limit: number }, res: number) {
    state.limit = res;
  },
  setOffset(state: { offset: number }, res: number) {
    state.offset = res;
  },
  deletePosts(state: { allPosts: any }) {
    state.allPosts = [];
  }
};

const actions = {
  getPosts(context: any) {
    return new Promise((resolve: any, reject: any) => {
      context.commit('setGettingPosts', true);
      api
        .getPosts(context.getters.getOffset, context.state.filterType)
        .then((res: IGetPostReturn) => {
          context.commit('setGettingPosts', false);
          context.commit('setAllPosts', res);
          context.commit('setTotal', res);
          context.commit('setLimit', res.limit);
          context.commit('setOffset', res.offset);
          resolve();
        })
        .catch(error => {
          context.commit('setErrorMsg', error);
          reject();
        });
    });
  },
  setFilterType({ commit, dispatch }: any, payload: string) {
    commit('setFilterType', payload);
    commit('setOffset', 0);
    commit('setLimit', 0);
    commit('deletePosts');
    dispatch('getPosts');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
