import {
  queryLogList,
  removeLogRecords,
  addRule,
  updateRule
} from "@/services/api";

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
      const response = yield call(queryLogList, payload);
      response.pagination = {
        currentPage: payload.currentPage,
        pageSize: payload.pageSize,
        total: response.total
      };
      delete response.total;

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
      yield call(removeLogRecords, payload.id);

      let response = yield call(queryLogList, payload.pagination);

      if (!response.list.length && payload.pagination.currentPage > 1) {
        payload.pagination.currentPage--;
        response = yield call(queryLogList, payload.pagination);
      }
      response.pagination = {
        currentPage: payload.pagination.currentPage,
        pageSize: payload.pagination.pageSize,
        total: response.total
      };
      delete response.total;

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
