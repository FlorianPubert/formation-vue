/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import MutationTypes from '../mutation-types';
import ActionTypes from '../action-types';

interface State {
  user: string;
}

const usersModule = {
  state: () => ({
    user: null,
  }),
  mutations: {
    [MutationTypes.UPDATE_CURRENT_USER](state: State, user: string) {
      state.user = user;
    },
  },
  getters: {
  },
  actions: {
    [ActionTypes.SIGN_IN]({ commit }: any) {
      axios.post('/api/sign-in')
        .then((result) => commit('updateCurrentUser', result.data))
        .catch(console.error);
    },
  },
};

export default usersModule;
