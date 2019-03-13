import { queryLogList, removeRule, addRule, updateRule } from "@/services/api";

export default {
  namespace: "logList",

  state: {
    data: {
      list: [],
      pagination: {}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log("payload: ", payload);
      const response = yield call(queryLogList, payload);
      response.pagination = {
        currentPage: payload.currentPage,
        pageSize: payload.pageSize,
        total: response.total
      };
      delete response.total;
      console.log("response: ", response);
      yield put({
        type: "save",
        payload: response
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
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
