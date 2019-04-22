import { queryGameList, removeGame } from "@/services/game";

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
    },
    *remove({ payload, callback }, { call, put }) {
      yield call(removeGame, payload.id);

      let response = yield call(queryGameList, {
        ...payload.pagination
      });

      if (!response.list.length && payload.pagination.current > 1) {
        payload.pagination.current--;
        response = yield call(queryGameList, {
          ...payload.pagination
        });
      }
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    }
  }
};
