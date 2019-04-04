import { queryCommentList, removeLogRecords } from "@/services/api";

export default {
  namespace: "comment",

  state: {
    data: {
      list: [],
      pagination: {}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCommentList, payload);
      yield put({
        type: "save",
        payload: response
      });
    },
    *remove({ payload, callback }, { call, put }) {
      yield call(removeLogRecords, payload.id);

      let response = yield call(queryLogList, {
        ...payload.pagination,
        startDate: payload.startDate,
        endDate: payload.endDate
      });

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
