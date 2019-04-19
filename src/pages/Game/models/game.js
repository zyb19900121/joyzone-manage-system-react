import { queryGameList } from "@/services/game";

export default {
  namespace: "game",

  state: {
    data: {
      list: []
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryGameList, payload);
      yield put({
        type: "save",
        payload: response
      });
    }
  },

  reducers: {
    save(state, action) {
			console.log('action: ', action);
      return {
        ...state,
        data: action.payload
      };
    }
  }
};
