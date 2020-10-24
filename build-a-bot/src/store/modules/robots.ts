/* eslint-disable @typescript-eslint/no-explicit-any */
import { Robot } from '@/models/Robot';
import { RobotPart } from '@/models/RobotPart';
import axios from 'axios';
import MutationTypes from '../mutation-types';
import ActionTypes from '../action-types';
import GetterTypes from '../getter-types';

interface State {
    cart: Robot[];
    heads: RobotPart[];
    arms: RobotPart[];
    torsos: RobotPart[];
    bases: RobotPart[];
}

const robotsModule = {
  namespaced: true,
  state: () => ({
    cart: Array<Robot>(),
    heads: Array<RobotPart>(),
    arms: Array<RobotPart>(),
    torsos: Array<RobotPart>(),
    bases: Array<RobotPart>(),
  }),
  mutations: {
    [MutationTypes.ADD_ROBOT_TO_CART](state: State, robot: Robot) {
      state.cart.push(robot);
    },
    [MutationTypes.UPDATE_HEAD_PARTS](state: State, parts: RobotPart[]) {
      state.heads = parts;
    },
    [MutationTypes.UPDATE_ARM_PARTS](state: State, parts: RobotPart[]) {
      state.arms = parts;
    },
    [MutationTypes.UPDATE_TORSO_PARTS](state: State, parts: RobotPart[]) {
      state.torsos = parts;
    },
    [MutationTypes.UPDATE_BASE_PARTS](state: State, parts: RobotPart[]) {
      state.bases = parts;
    },
  },
  actions: {
    [ActionTypes.GET_PARTS]({ commit }: any): void {
      axios.get('/api/parts')
        .then((result) => {
          commit(MutationTypes.UPDATE_HEAD_PARTS, result.data.heads as Array<RobotPart>);
          commit(MutationTypes.UPDATE_ARM_PARTS, result.data.arms as Array<RobotPart>);
          commit(MutationTypes.UPDATE_TORSO_PARTS, result.data.torsos as Array<RobotPart>);
          commit(MutationTypes.UPDATE_BASE_PARTS, result.data.bases as Array<RobotPart>);
        })
        .catch(console.error);
    },
    [ActionTypes.ADD_ROBOT_TO_CART]({ commit, state }: any, robot: Robot): Promise<void> {
      return axios.post('/api/cart', [...state.cart, robot])
        .then(() => commit(MutationTypes.ADD_ROBOT_TO_CART, robot))
        .catch(console.error);
    },
  },
  getters: {
    [GetterTypes.GET_CART_SALE_ITEMS](state: State): Robot[] {
      return state.cart.filter((item: Robot) => item.head.onSale === true);
    },
  },
};

export default robotsModule;
